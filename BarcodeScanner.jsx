import { useState } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner = ({ onClickVerify }) => {
  const [result, setResult] = useState("");
  const [isVerify, setIsVerify] = useState(false);

  // function for capturing video and decoding using Zxing Library
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setIsVerify(true);
    },
  });

  return (
    <>
      <div style={{display: "flex",flexDirection: "column",alignItems: "center"}}>
        <video
          ref={ref}
          style={{width: "240px", height: "240px", marginBottom: "-20px", marginTop: "-20px",}}
        />
        {result !== "" ? (
          <p style={{fontFamily: "Arial, sans-serif",fontSize: "16px",textAlign: "center",marginBottom: "5px"}}>
            <span>Last result:</span>
            <span style={{ fontWeight: "bold" }}>{result}</span>
          </p>
        ) : (
          <p style={{fontFamily: "Arial, sans-serif",fontSize: "16px",textAlign: "center",marginBottom: "5px"}}>
            <span>Try to properly align the camera</span>
          </p>
        )}
        {isVerify && (
          <button
            onClick={() => onClickVerify(result)}
            style={{ backgroundColor: "#87CEEB", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", cursor: "pointer",}}
          >
            Verify
          </button>
        )}
      </div>
    </>
  );
};

export default BarcodeScanner;
