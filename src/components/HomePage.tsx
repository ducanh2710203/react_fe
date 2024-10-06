import React from "react";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "rsuite/Calendar/styles/index.css";
function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: "10:30 am", title: "Meeting" },
        { time: "12:00 pm", title: "Lunch" },
      ];
    case 15:
      return [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Product design discussion" },
        { time: "05:00 pm", title: "Product test and acceptance" },
        { time: "06:30 pm", title: "Reporting" },
        { time: "10:00 pm", title: "Going home to walk the dog" },
      ];
    default:
      return [];
  }
}

const HomePage = () => {
  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a className="text-blue-500 underline cursor-pointer">
              {moreCount} more
            </a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list space-y-1 text-sm">
          {displayList.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      {/* Điều chỉnh thêm class Tailwind vào Calendar */}
      <Calendar
        bordered
        renderCell={renderCell}
        className="w-full border-collapse text-center"
        // Ghi đè style cho ô lịch
        cellRender={(date) => (
          <div className="border p-2 h-20 text-sm flex items-start justify-start">
            {date.getDate()}
            {renderCell(date)}
          </div>
        )}
      />
    </div>
  );
};

export default HomePage;
