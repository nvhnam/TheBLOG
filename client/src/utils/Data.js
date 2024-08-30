/* eslint-disable no-unused-vars */
export const posts = [
  {
    id: 1,
    title: "Advances in AI",
    body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    image: "https://placehold.co/600x400",
    user_id: 2,
    created_at: "2024-08-30T10:00:00Z", // 5 minutes ago
  },
  {
    id: 2,
    title: "New Health Trends",
    body: "Some text about health...",
    image: "https://placehold.co/600x400",
    user_id: 2,
    created_at: "2024-08-29T07:00:00Z", // 3 hours ago
  },
  {
    id: 3,
    title: "Economy Insights",
    body: "Some text about economy...",
    image: "https://placehold.co/600x400",
    user_id: 1,
    created_at: "2024-08-27T14:00:00Z", // 2 days ago
  },
  {
    id: 4,
    title: "Tech Innovations",
    body: "Some text about tech...",
    image: "https://placehold.co/600x400",
    user_id: 2,
    created_at: "2024-07-30T10:00:00Z", // 1 month ago
  },
  {
    id: 5,
    title: "World News",
    body: "Some text about world news...",
    image: "https://placehold.co/600x400",
    user_id: 1,
    created_at: "2023-08-29T09:00:00Z", // 1 year ago
  },
];

export const users = [
  {
    id: 1,
    username: "admin",
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    username: "nvhnam01",
    image: "https://placehold.co/600x400",
  },
];

export const postsCategories = [
  {
    post_id: 1,
    category_id: 1,
  },
  {
    post_id: 3,
    category_id: 1,
  },
  {
    post_id: 4,
    category_id: 1,
  },
  {
    post_id: 5,
    category_id: 1,
  },
  {
    post_id: 2,
    category_id: 3,
  },
];

export const categories = [
  {
    id: 1,
    name: "Science",
  },
  {
    id: 2,
    name: "Politic",
  },
  {
    id: 3,
    name: "Health",
  },
  {
    id: 4,
    name: "Art",
  },
];
