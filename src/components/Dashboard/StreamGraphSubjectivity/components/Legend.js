import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const Legend = ({ data, selectedItems, onChange }) => (
  <div className="legendContainer">
    {data.map((d) => (
      <div className="checkbox" style={{ color: d.color }} key={d.name}>
  <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: d.color}}
            value={d.name}
            onChange={() => onChange(d.name)}
          />
        }
        label={d.name}

        />
      </div>
    ))}
  </div>
);

export default Legend;
