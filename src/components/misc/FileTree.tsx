import { File, Folder, Tree } from "./file-tree";

export function FileTreeDemo() {
  return (
    <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background ">
      <Tree
        className="overflow-hidden rounded-md bg-background p-2"
        initialSelectedId="7"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11"
        ]}
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element="google">
            <File value="3">
              <p>Docs</p>
            </File>
            <File value="4">
              <p>Google Docs</p>
            </File>
            <File value="5">
              <p>Google Drive</p>
            </File>
            <File value="5">
              <p>Spreadsheet</p>
            </File>
          </Folder>
          <Folder value="5" element="microsoft">
            <File value="7">
              <p>OneDrive</p>
            </File>

            <File value="8">
              <p>Sharepoint</p>
            </File>
            <File value="9">
              <p>Excel</p>
            </File>
          </Folder>
          <Folder value="10" element="Local">
            <File value="11">
              <p>Local Drive</p>
            </File>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "Google",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "Docs"
          },
          {
            id: "4",
            isSelectable: true,
            name: "Google Drive"
          },
          {
            id: "5",
            isSelectable: true,
            name: "Spreadsheet"
          }
        ]
      },
      {
        id: "6",
        isSelectable: true,
        name: "Microsoft",
        children: [
          {
            id: "7",
            isSelectable: true,
            name: "OneDrive"
          },
          {
            id: "8",
            isSelectable: true,
            name: "Sharepoint"
          },
          {
            id: "9",
            isSelectable: true,
            name: "Excel"
          }
        ]
      },
      {
        id: "10",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "11",
            isSelectable: true,
            name: "utils.ts"
          }
        ]
      }
    ]
  }
];
