export type Product = {
  handle: string;
  body_html: string;
  images: [
    {
      width: number;
      id: string;
      src: string;
      height: number;
    }
  ];
  title: string;
  product_id: string;
};
