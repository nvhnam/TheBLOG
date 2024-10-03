import { postsCategories, categories } from "./Data";

export default function getCategoriesForPost(postId) {
  return postsCategories
    .filter((pc) => pc.post_id === postId)
    .map((postCategory) =>
      categories.find((category) => category.id === postCategory.category_id)
    );
}
