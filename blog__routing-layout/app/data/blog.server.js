import { prisma } from "./database.server";

function isValidInputTitle(title) {
  return title && title.trim().length > 0 && title.trim().length < 60;
}

function isValidContent(content) {
  return content && content.trim().length > 0;
}

export function validatePostRequest(input) {
  let validationErrors = {};

  if (!isValidInputTitle(input.title)) {
    validationErrors.title = "Title is required. Provide until 60 characters.";
  }

  if (!isValidContent(input.content)) {
    validationErrors.content = "Content is required";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

export async function getPosts({ limit = null } = {}) {
  try {
    // const catId = "63e447e8ca8d78ce22dc7e26";
    // const catId2 = "63e54187fee44c62e2806dec";

    // await prisma.post.create({
    //   data: {
    //     title: "Post 1",
    //     content: "Content 1",
    //     categories: {
    //       connect: [
    //         {
    //           id: catId,
    //         },
    //         {
    //           id: catId2,
    //         },
    //       ],
    //     },
    //   },
    // });

    let paramsFind = {
      orderBy: { createdAt: "desc" },
      include: {
        categories: true,
      },
    };
    if (limit) {
      paramsFind["take"] = limit;
    }

    return await prisma.post.findMany(paramsFind);
  } catch (error) {
    throw new Error("Failed to get posts");
  }
}

export async function getPost(id) {
  try {
    return await prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        categories: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to get post");
  }
}

export async function addPost(postData) {
  try {
    return await prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        categories: {
          connect: postData?.categories.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add post");
  }
}

export async function updatePost(id, postData) {
  try {
    return await prisma.post.update({
      where: { id },
      data: {
        title: postData.title,
        content: postData.content,
        categories: {
          set: postData?.categories.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add post");
  }
}

export function validateCategoryRequest(input) {
  let validationErrors = {};

  if (!isValidInputTitle(input.name)) {
    validationErrors.name = "Title is required. Provide until 60 characters.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

export async function addCategory(categoryData) {
  try {
    return await prisma.category.create({
      data: categoryData,
    });
  } catch (error) {
    throw new Error("Failed to add category");
  }
}

export async function updateCategory(id, categoryData) {
  try {
    console.log({
      where: {
        id,
      },
      data: {
        name: categoryData.name,
      },
    });
    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: categoryData.name,
      },
    });
  } catch (error) {
    throw new Error("Failed to update category");
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        posts: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to get category");
  }
}

export async function getCategory(categoryId) {
  try {
    return await prisma.category.findUniqueOrThrow({
      where: { id: categoryId },
      include: {
        posts: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to get category");
  }
}
