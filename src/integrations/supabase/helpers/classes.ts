import { Class, Domain, Feature, Subclass } from "@/lib/types";
import { supabase } from "../client";
import { Option } from "@/components/molecules/GenericMultiSelect";

export const getSingleClassBySlug = async (
  slug: string
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

export const getSingleSubclassById = async (
  id: number
): Promise<Subclass | null> => {
  const { data, error } = await supabase
    .from("subclasses")
    .select("*, class: class_id ( name )")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Subclass;
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
  slug: string
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

export const getAllBaseClasses = async (): Promise<Option[] | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select("id, name")
    .eq("isHomebrew", false);

  if (error) {
    console.log(error);
    return null;
  }
  return data.map((classData) => ({
    value: classData.id,
    label: String(classData.name),
  }));
};

export const getAllSubclasses = async (
  {
    limit,
    homebrew,
    user_id,
  }: { limit?: number; homebrew: boolean; user_id?: string } = {
    homebrew: false,
  }
): Promise<Subclass[] | null> => {
  const query = supabase
    .from("subclasses")
    .select("*, class: class_id ( name )");

  if (homebrew) {
    query.eq("isHomebrew", homebrew);
  }
  if (user_id) {
    query.eq("user_id", user_id);
  }

  const { data, error } = await query.limit(limit ?? 99);

  if (error) {
    console.log(error);
    return null;
  }

  return data as Subclass[];
};

export const getAllClassesWithDomains = async (
  {
    limit,
    homebrew,
    user_id,
  }: { limit?: number; homebrew: boolean; user_id?: string } = {
    homebrew: false,
  }
): Promise<Class[] | null> => {
  const query = supabase
    .from("classes")
    .select("*, classes_domains ( domains ( * ) )");

  if (homebrew) {
    query.eq("isHomebrew", homebrew);
  }
  if (user_id) {
    query.eq("user_id", user_id);
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
          (classDomain) => classDomain.domains
        ) as unknown as Domain[],
      }) as unknown as Class
  );
};

export const getSubclassesByClassId = async (
  classId: number
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
  additional?: {
    questions?: {
      background?: string[];
      connection?: string[];
    };
  };
}

export const publishSubclass = async (id: number): Promise<Subclass | null> => {
  const { data } = await supabase
    .from("subclasses")
    .update({ isPublished: true })
    .eq("id", id)
    .select()
    .single();

  if (!data) {
    return null;
  }

  return data as Subclass;
};

export const publishClass = async (id: number): Promise<Class | null> => {
  const { data } = await supabase
    .from("classes")
    .update({ isPublished: true })
    .eq("id", id)
    .select()
    .single();

  if (!data) {
    return null;
  }

  return data as Class;
};

export interface NewSubclassFormData {
  name: string;
  description: string;
  class: { value: number; label: string };
  features: {
    foundation: Partial<Feature>[];
    specialization: Partial<Feature>[];
    mastery: Partial<Feature>[];
  };
}

export const createNewHomebrewSubclass = async (
  newSubclass: NewSubclassFormData & {
    user_id: string;
  }
): Promise<Subclass | null> => {
  const { data: subclassData, error } = await supabase
    .from("subclasses")
    .insert({
      class_id: newSubclass.class.value,
      name: newSubclass.name,
      description: newSubclass.description,
      features: newSubclass.features,
      isHomebrew: true,
      isPublished: false,
      user_id: newSubclass.user_id,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return subclassData as Subclass;
};

export const createNewHomebrewClass = async (
  newClass: ClassFormData & { user_id: string }
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
    additional: newClass.additional ?? {},
  };

  const { data: classData, error } = await supabase
    .from("classes")
    .insert(formattedData)
    .select()
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  const id = classData.id;

  await supabase.from("classes_domains").insert(
    newClass.domains.map((domainId) => ({
      class_id: id,
      domain_id: domainId,
    }))
  );

  return classData as Class;
};

export const classSearchHelper = async (
  query: string
): Promise<Option[] | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select()
    .ilike("name", `%${query}%`)
    .limit(20);

  if (error) {
    console.log(error);
    return null;
  }

  return data.map((cls) => ({
    label: String(cls.name),
    value: cls.id,
  }));
};
