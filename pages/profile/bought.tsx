import Item from "@components/item";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

export default function Bought() {
  return (
    <Layout canGoBack title="구매내역">
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  );
}
