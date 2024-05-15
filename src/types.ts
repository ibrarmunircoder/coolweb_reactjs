export type Product = {
  handle: string;
  body_html: string;
  product_type?: string;
  tags?: string[];
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
