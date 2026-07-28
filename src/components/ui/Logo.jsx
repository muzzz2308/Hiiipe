import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const HOLD_MS = 6000;

export default function Logo({ to = "/", enableAdminHold = false }) {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const suppressClickRef = useRef(false);

  const clearHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startRef.current = null;
  };

  const onPointerDown = (e) => {
    if (!enableAdminHold) return;
    if (e.button !== undefined && e.button !== 0) return;
    suppressClickRef.current = false;
    startRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      suppressClickRef.current = true;
      clearHold();
      navigate("/admin");
    }, HOLD_MS);
  };

  const onPointerEnd = () => {
    if (!enableAdminHold) return;
    if (startRef.current) {
      const elapsed = Date.now() - startRef.current;
      if (elapsed > 200) {
        suppressClickRef.current = true;
      }
    }
    clearHold();
  };

  const onClick = (e) => {
    if (!enableAdminHold) return;
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  useEffect(() => () => clearHold(), []);

  const mark = (
    <span
      className="relative select-none font-display text-2xl tracking-tight"
      style={{ touchAction: enableAdminHold ? "none" : undefined }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerEnd}
      onPointerLeave={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onClick={onClick}
    >
      <span className="text-amber-50">h</span>
      <span className="text-primary">iii</span>
      <span className="text-amber-50">pe</span>
    </span>
  );

  if (!to) {
    return <div className="flex items-center gap-2">{mark}</div>;
  }

  return (
    <Link to={to} className="flex items-center gap-2" onClick={onClick}>
      {mark}
    </Link>
  );
}
