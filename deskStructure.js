import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "header",
        title: "Header",
        S,
        context,
      }),

      S.divider(),

      orderableDocumentListDeskItem({
        type: "projects",
        title: "Projects",
        S,
        context,
      }),

      S.divider(),

      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),


      S.listItem().title("Clients").child(
        S.documentTypeList("kunden")
          .title("Clients")
          .apiVersion('v2023-11-02')
          .filter('_type == "kunden"') 
      ),

      orderableDocumentListDeskItem({
        type: "jobs",
        title: "Jobs",
        S,
        context,
      }),

      S.listItem()
        .title("Contact")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),

      S.divider(),

      S.listItem()
        .title("Imprint")
        .id("imprint")
        .child(S.document().schemaType("imprint").documentId("imprint")),

      S.listItem()
        .title("Privacy")
        .id("privacy")
        .child(S.document().schemaType("privacy").documentId("privacy")),
    ]);
