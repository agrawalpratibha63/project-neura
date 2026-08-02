"use client";

export default function StatusBadge() {
  return (
    <div
      style={{
        display: "inline-flex",

        alignItems: "center",

        gap: 10,

        padding: "10px 18px",

        borderRadius: 30,

        background: "rgba(34,197,94,.08)",

        border: "1px solid rgba(34,197,94,.25)",

        width: "fit-content",
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,

          borderRadius: "50%",

          background: "#22c55e",

          boxShadow: "0 0 12px #22c55e",
        }}
      />

      <span
        style={{
          color: "#d1fae5",

          fontWeight: 600,

          fontSize: 14,
        }}
      >
        Available for Internship
      </span>
    </div>
  );
}