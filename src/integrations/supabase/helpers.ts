import { Class, Domain, Subclass, Ancestry, Community, CharacterWithRelations } from "@/lib/types";
import { supabase } from "./client";

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
    .select("*, classes_domains ( domains ( * ) )")
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
  limit = 99
): Promise<Class[] | null> => {
  const { data, error } = await supabase
    .from("classes")
    .select("*, classes_domains ( domains ( * ) )")
    .limit(limit);

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
  return data;
};

export const getSingleDomainBySlug = async (
  slug: string
): Promise<Domain | null> => {
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain;
};

export const getSingleDomain = async (id: number): Promise<Domain | null> => {
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain;
};

export const getAllDomains = async (limit = 99): Promise<Domain[] | null> => {
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .limit(limit);

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain[];
};

export const getAllAncestries = async (
  limit = 99
): Promise<Ancestry[] | null> => {
  const { data, error } = await supabase
    .from("ancestries")
    .select("*")
    .limit(limit);

  if (error) {
    console.log(error);
    return null;
  }

  return data as Ancestry[];
};

export const getAllCommunities = async (
  limit = 99
): Promise<Community[] | null> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .limit(limit);

  if (error) {
    console.log(error);
    return null;
  }
  return data as Community[];
};

export const getSingleAncestryBySlug = async (
  slug: string
): Promise<Ancestry | null> => {
  const { data, error } = await supabase
    .from("ancestries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Ancestry;
};

export const getCharacterById = async (cId: string) = {
  const { data, error } = await supabase
    .from("characters")
    .select(
      "*, class(name), ancestry(name), subclass(name), community(name)"
    )
    .eq("id", characterId)
    .single();

  if (error) {
    console.log(error);
    return null;
  };
  return data as CharacterWithRelations;
};
