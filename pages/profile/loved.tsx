import Item from "@components/item";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

export default function Loved() {
  return (
    <Layout canGoBack title="관심목록">
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
}
