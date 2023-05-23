import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
export const Mobile = ({ formControl, onChange, value }: any) => {
  return (
    <PhoneInput
      country={"eg"}
      inputStyle={{ width: "100%" }}
      containerStyle={{ width: "100%" }}
      enableSearch
      enableAreaCodes
      countryCodeEditable={false}
      inputProps={{
        name: formControl.name,
        // required: true,
      }}
      onChange={(e) => onChange(e)}
      value={value}
    />
  );
};
