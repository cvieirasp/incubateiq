"use server";

import { auth } from "@/auth";
import slugify from "slugify";

import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils";

type CreatePitchData = {
  title: string;
  description: string;
  category: string;
  link: string;
  pitch: string;
};

export const createStartup = async ({
  title,
  description,
  category,
  link,
  pitch,
}: CreatePitchData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Não Autenticado",
      status: "ERROR",
    });

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (err) {
    console.log(err);

    return parseServerActionResponse({
      error: JSON.stringify(err),
      status: "ERROR",
    });
  }
};
