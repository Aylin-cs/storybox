interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div style={{ marginBottom: "14px" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #dcdcdc",
          borderRadius: "6px",
          fontSize: "15px",
          boxSizing: "border-box",
          outline: "none",
          backgroundColor: "#fff",
        }}
      />
    </div>
  );
};

export default InputField;