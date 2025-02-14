// server side rendering
// import { notFound } from "next/navigation";
// import { UserData } from "@/types";
// import API from "@/lib/api";

// const getUser = async (id: string) => {
//   try {
//     const response = await API.get(`/user/${id}`);
//     return response?.data?.userData;
//   } catch (err: unknown) {
//     console.error("Error fetching user:", err);
//   }
// };

// export default async function ProfilePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;
//   const user: UserData | null = await getUser(id);
//   console.log("user", user);

//   if (!user) {
//     return notFound();
//   }

//   return (
//     <div className="p-6 border rounded shadow-lg">
//       <h1 className="text-2xl font-bold">{user.name}</h1>
//       <p className="text-gray-600">{user.email}</p>
//       <p className="text-gray-400">
//         Joined on {new Date(user.createdAt).toLocaleDateString()}
//       </p>

//       <h2 className="mt-4 text-xl font-semibold">Tasks</h2>
//       <ul className="list-disc pl-5">
//         {user.posts
//  && Array.isArray(user.posts
// ) && user?.posts
// ?.length > 0 ? (
//           user?.posts
// ?.map((post
// ) => (
//             <li key={post
// ?.id} className="text-gray-700">
//               {post
// ?.title}: {post
// .description}
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No posts
//  found</p>
//         )}
//       </ul>
//     </div>
//   );
// }

import ProfilePage from "@/components/ProfilePage";

export default function Profile() {
  return <ProfilePage />;
}
