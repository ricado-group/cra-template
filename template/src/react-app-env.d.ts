/// <reference types="react-scripts" />

declare module "*.module.less" {
  const styles: { [key: string]: string };
  export default styles;
}
