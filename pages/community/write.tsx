import Layout from "../../components/layout";

export default function Write() {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <textarea
          className="border-gary-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={4}
          placeholder="Ask a question!"
        />
        <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Submit
        </button>
      </form>
    </Layout>
  );
}
