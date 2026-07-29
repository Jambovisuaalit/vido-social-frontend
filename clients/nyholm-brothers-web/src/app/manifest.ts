import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nyholm Brothers Oy",
    short_name: "Nyholm Brothers",
    description:
      "Rakennusliike Espoossa ja pääkaupunkiseudulla – remontit ja rakentaminen sovitusti.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#0d0d0d",
    lang: "fi",
  };
}
