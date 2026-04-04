import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "裁员情报",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LayoffNewsPage() {
  permanentRedirect("/community");
}
