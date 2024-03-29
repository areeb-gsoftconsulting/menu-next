import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BaseEditor, Descendant, createEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";

const ItemDescriptionContainer = ({ data }: any) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [text, setText] = useState<any>(data || []);

  useEffect(() => {
    setText(data);
  }, [data]);

  editor.children = data;

  return false ? (
    <p>Loading...</p>
  ) : (
    <Slate editor={editor} initialValue={text}>
      <Editable
        className="editable"
        style={{
          border: "none",
          color: "var(--ion-text-color)",
          fontFamily: "poppins",
          lineHeight: "1.2",
          fontSize: "14px",
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        readOnly
      />
    </Slate>
  );
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align, margin: "0px 0px 0px 0px" };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default ItemDescriptionContainer;
