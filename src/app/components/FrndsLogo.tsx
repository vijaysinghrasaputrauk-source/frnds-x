import logoImage from "../../imports/WhatsApp_Image_2026-05-17_at_00.27.09-3.jpeg";

// Frnds.x Logo Component - Using Custom Image
export function FrndsLogo({
  size = "large",
  showText = false,
  variant = "light"
}: {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  variant?: "light" | "dark";
}) {
  const sizes = {
    small: { width: "80px", height: "80px", textSize: "20px" },
    medium: { width: "96px", height: "96px", textSize: "24px" },
    large: { width: "112px", height: "112px", textSize: "30px" }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={logoImage}
        alt="Frnds.x Logo"
        style={{
          width: currentSize.width,
          height: currentSize.height,
          objectFit: "contain",
          borderRadius: "16px"
        }}
      />
      {showText && (
        <div style={{ textAlign: "center", marginTop: "4px" }}>
          <h1
            style={{
              fontSize: currentSize.textSize,
              fontWeight: "900",
              margin: 0,
              lineHeight: 1.2
            }}
          >
            <span style={{ color: variant === "light" ? "#FFFFFF" : "#1F2937" }}>Frnds</span>
            <span style={{ color: variant === "light" ? "#FFFFFF" : "#9333EA" }}>.x</span>
          </h1>
        </div>
      )}
    </div>
  );
}

export function FrndsLogoIcon({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { width: "48px", height: "48px" },
    medium: { width: "56px", height: "56px" },
    large: { width: "80px", height: "80px" }
  };

  const currentSize = sizes[size];

  return (
    <img
      src={logoImage}
      alt="Frnds.x Logo"
      style={{
        width: currentSize.width,
        height: currentSize.height,
        objectFit: "contain",
        borderRadius: "12px"
      }}
    />
  );
}
