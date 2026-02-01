// CONCEPT: Unmatched Routes
// When using Parallel Routes (@slot), if you navigate to a page where the slot
// doesn't have a matching file, Next.js tries to render 'default.tsx'.
// It's like a fallback. returning null means "Show nothing".

export default function Default() {
  return null;
}
