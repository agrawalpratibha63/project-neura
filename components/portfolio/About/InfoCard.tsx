"use client";

type Props = {
  label: string;
  value: string;
};

export default function InfoCard({ label, value }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        padding: "14px 18px",

        borderRadius: 14,

        background: "rgba(255,255,255,.04)",

        border: "1px solid rgba(255,255,255,.08)",

        backdropFilter: "blur(12px)",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "white",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {value}
      </span>
    </div>
  );
}