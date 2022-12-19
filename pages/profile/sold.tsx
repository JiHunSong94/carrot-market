import Layout from "@components/layout";
import ProductList from "@components/product-list";

export default function Sold() {
  return (
    <Layout canGoBack seoTitle="판매내역" title="판 매 내 역">
      <div className="flex flex-col space-y-5 divide-y pb-10">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
}
