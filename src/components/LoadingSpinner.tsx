export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-2 border-t-yellow-400 border-r-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
