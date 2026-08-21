import HomeClient from "./HomeClient";
import { getFeedSections } from "./lib/posts";

export default function BlogPage() {
  const { client, provider, community } = getFeedSections();

  return (
    <HomeClient clientPosts={client} providerPosts={provider} communityPosts={community} />
  );
}
