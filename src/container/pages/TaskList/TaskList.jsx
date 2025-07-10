import React, { memo } from "react";
import InputSearch from "../../../components/InputSearch/InputSearch";
import Button from "../../../components/Button/Button";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { DropdownOpt } from "../../../utils/constant";

function TaskList() {
  return (
    <section className="min-h-[70vh] w-full">
      <main className="flex items-center justify-between w-full px-20">
        <InputSearch />
        <div className="flex items-center gap-2">
          <Button>+ Add New Task</Button>
          <Dropdown options={DropdownOpt} />
        </div>
      </main>
    </section>
  );
}

export default memo(TaskList);
