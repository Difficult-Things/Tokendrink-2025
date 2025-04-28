import * as React from "react";
import * as Select from "@radix-ui/react-select";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { GenerationColours, MAX_ROUNDS } from "@/types/data";

import "./alertStyling.css";

import Nestable, { Item } from "react-nestable";
import "react-nestable/dist/styles/index.css";

export function Control(props: any) {
  const [round, setRound] = React.useState("1");
  const [roundState, setRoundState] = React.useState("drinking");

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const colour = GenerationColours[item.id - 1];
    return (
      <div className="flex flex-row items-center gap-2">
        {index + 1}.
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colour }}
        ></div>
        <span>{item.text}</span>
      </div>
    );
  }

  const doSomethingWithChange = (items: any) => {
    props.setRanking(items.items);
    return true;
  };

  React.useEffect(() => {
    const initialRanking = Object.values(GenerationColours).map((colour, index) => ({
      text: colour.charAt(0).toUpperCase() + colour.slice(1),
      id: index + 1,
    }));

    props.setRanking(initialRanking);
  }, []);

  return (
    <div className="flex flex-col m-4 gap-4">
      <div>
        <h2 className="text-lg font-bold">CONTROLS</h2>
        <span className="text-sm text-slate-300">Drag and drop the items to change the ranking</span>
      </div>

      <div className="flex flex-row items-center justify-center">
        <div className="m-5">
          <Nestable maxDepth={1} onChange={doSomethingWithChange} items={props.ranking} renderItem={renderItem} />
        </div>

        <div className="flex row">
          <div className="m-5">
            <Select.Root value={round} onValueChange={setRound}>
              <Select.Trigger>
                <Select.Value aria-label={round}>{round}</Select.Value>
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content position="popper" sideOffset={5} className="bg-slate-700">
                  <Select.Viewport>
                    {Array.from({ length: MAX_ROUNDS }, (_, i) => (
                      <Select.Item key={i + 1} value={`${i + 1}`}>
                        <Select.ItemText>{i + 1}</Select.ItemText>
                        <Select.ItemIndicator>{` <--`}</Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="m-5">
            <Select.Root value={roundState} onValueChange={setRoundState}>
              <Select.Trigger>
                <Select.Value aria-label={roundState}>{roundState}</Select.Value>
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content position="popper" sideOffset={5} className="bg-slate-700">
                  <Select.Viewport>
                    <Select.Item value="drinking">
                      <Select.ItemText>Drinking</Select.ItemText>
                      <Select.ItemIndicator>{` <--`}</Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item value="race">
                      <Select.ItemText>Race</Select.ItemText>
                      <Select.ItemIndicator>{` <--`}</Select.ItemIndicator>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <button className="Button violet"> Launch 🚀</button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
              <AlertDialog.Title className="AlertDialogTitle">Are you sure you want to do this?</AlertDialog.Title>
              <AlertDialog.Description className="AlertDialogDescription">This will push an event to the game screen!</AlertDialog.Description>
              <div style={{ display: "flex", gap: 30, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                  <button className="Button mauve">Cancel</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    className="Button red"
                    onClick={() => {
                      props.client.publish(
                        "game/state",
                        JSON.stringify({
                          round: parseInt(round),
                          state: roundState,
                          ranking: props.ranking.map((item: Item) => (
                            item.id
                          )),
                        })
                      );
                    }}
                  >
                    Yes, update game state
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    </div>
  );
}
