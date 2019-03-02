import React from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/merbivore";
import "brace/theme/sqlserver";
import styled from "styled-components";
import { duelTyping } from "../../socket/api";

const diffOnLoad = editor => {
  window.addEventListener("resize", () => {
    editor.resize();
  });
};

const DuelEditor = props => {
  return (
    <Wrapper>
      <PlayerEditor>
        <AceEditor
          mode="javascript"
          theme={props.dark ? "merbivore" : "sqlserver"}
          onLoad={diffOnLoad}
          name="UNIQUE_ID_OF_DIV"
          value={props.input}
          onChange={e => {
            props.addDuelSolution("solution", e);
            duelTyping(e);
          }}
          editorProps={{ $blockScrolling: true }}
          fontSize={14}
          cursorStart={2}
          showPrintMargin={true}
          highlightActiveLine={true}
          width="100%"
          height="100%"
          setOptions={{
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </PlayerEditor>
      <OpponentEditor>
        <AceEditor
          mode="javascript"
          theme={props.dark ? "merbivore" : "sqlserver"}
          onLoad={diffOnLoad}
          readOnly
          value={props.opponent}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          fontSize={14}
          cursorStart={2}
          showPrintMargin={true}
          highlightActiveLine={true}
          width="100%"
          height="100%"
          setOptions={{
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </OpponentEditor>
    </Wrapper>
  );
};

export default DuelEditor;

const Wrapper = styled.div`
  grid-row: 2;
  grid-column: 1 / 3;
  margin-right: 1rem;
  margin-left: 1rem;
  height: 55vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.9);
`;
const PlayerEditor = styled.div`
  grid-column: 1;
`;
const OpponentEditor = styled.div`
  grid-column: 2;
`;
