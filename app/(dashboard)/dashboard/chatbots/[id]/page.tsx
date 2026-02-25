// 1. Define params as a Promise
type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  // 2. You MUST await the params before using them
  const { id } = await props.params;

  return <div>ID is: {id}</div>;
}