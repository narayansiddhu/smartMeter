export default function () {
  return [
    {
      title: "Utility",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: ""
    },
    {
      title: "Analytics",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    }
  ];
}
