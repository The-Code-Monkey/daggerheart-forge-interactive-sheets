import { Class, Domain, Feature, Subclass } from "@/lib/types";
import { supabase } from "../client";
import { useAuth } from "@/contexts/AuthContext";

export const getSingleClassBySlug = async (
  slug: string,
): Promise<Class | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Class;
};

interface ClassWithDomainsResponse {
  classes_domains: {
    domains: Domain;
  }[];
}

const transformClassWithDomains = (data: ClassWithDomainsResponse): Class =>
  ({
    ...data,
    domains: data.classes_domains.map((cd) => cd.domains),
  }) as unknown as Class;

export const getSingleClassBySlugWithDomains = async (
  slug: string,
): Promise<Class | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select("*, subclass: subclasses ( * ), classes_domains ( domains ( * ) )")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return transformClassWithDomains(data as ClassWithDomainsResponse);
};

export const getSingleClass = async (id: number): Promise<Class | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Class;
};

export const getAllClasses = async (limit = 99): Promise<Class[] | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .limit(limit);

  if (error) {
    console.log(error);
    return null;
  }
  return data as Class[];
};

export const getAllClassesWithDomains = async (
  { limit, homebrew }: { limit?: number; homebrew: boolean } = {
    homebrew: false,
  },
): Promise<Class[] | null> => {
  const query = supabase
    .from("classes")
    .select("*, classes_domains ( domains ( * ) )");

  if (homebrew) {
    query.eq("isHomebrew", homebrew);
  }

  const { data, error } = await query.limit(limit ?? 99);

  if (error) {
    console.log(error);
    return null;
  }
  return data.map(
    (classData) =>
      ({
        ...classData,
        domains: classData.classes_domains.map(
          (classDomain) => classDomain.domains,
        ) as unknown as Domain[],
      }) as unknown as Class,
  );
};

export const getSubclassesByClassId = async (
  classId: number,
): Promise<Subclass[] | null> => {
  const { data, error } = await supabase
    .from("subclasses")
    .select("*")
    .eq("class_id", classId);
  if (error) {
    console.log(error);
    return null;
  }
  return data as Subclass[];
};

interface ClassFormData {
  name: string;
  description: string;
  base_hp: number;
  base_evasion: number;
  class_items: string;
  features: Partial<Feature>[];
  domains: number[];
  isHomebrew: true;
}

export const createNewHomebrewClass = async (
  newClass: ClassFormData & { user_id: string },
): Promise<Class | null> => {
  const formattedData = {
    user_id: newClass.user_id,
    name: newClass.name,
    description: newClass.description,
    base_hp: newClass.base_hp,
    base_evasion: newClass.base_evasion,
    class_items: newClass.class_items,
    features: newClass.features,
    isHomebrew: true,
  };

  const { data: classData, error } = await supabase
    .from("classes")
    .insert(formattedData)
    .select()
    .single();

  console.log(classData);
  if (error) {
    console.log(error);
    return null;
  }

  const id = classData.id;

  await supabase.from("classes_domains").insert(
    newClass.domains.map((domainId) => ({
      class_id: id,
      domain_id: domainId,
    })),
  );

  return classData as Class;
};
