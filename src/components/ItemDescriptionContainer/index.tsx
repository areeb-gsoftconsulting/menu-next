import React, { useEffect, useState } from "react";
import { BaseEditor, Descendant, createEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

type Props = {};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "You can have it iced or hot, with regular milk or plant based alternative (oat or pea) ",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Sie können ihn eisgekühlt oder heiß, mit normaler Milch oder einer veganen Alternative (Hafer- oder Erbsenmilch) genießen",
      },
    ],
  },
];

const ItemDescriptionContainer = ({ data }: any) => {
  const [text, setText] = useState<any>([]);
  const description = async () => {
    console.log("testing 1", data);
    let temp = await JSON.parse(data);
    setText(temp);
  };
  useEffect(() => {
    description();
  }, []);
  console.log({ text });
  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.

  return text.length == 0 ? (
    <p>Loading...</p>
  ) : (
    <Slate editor={editor} initialValue={text}>
      <Editable readOnly />
    </Slate>
  );
};

export default ItemDescriptionContainer;
