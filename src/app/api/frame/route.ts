import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputText = body.untrustedData?.inputText || "";
    const buttonIndex = body.untrustedData?.buttonIndex;

    // Jeśli użytkownik kliknął "Watch default channel"
    if (buttonIndex === 1) {
      const channel = "profitmilion";

      return NextResponse.json({
        type: "frame",
        version: "vNext",
        content: {
          title: "Opening stream...",
          url: `https://streamhub-miniapp.vercel.app/?channel=${channel}`,
        },
      });
    }

    // Jeśli użytkownik wpisał własny kanał
    if (buttonIndex === 2) {
      const channel = inputText.trim().toLowerCase();

      if (!channel) {
        return NextResponse.json({
          type: "frame",
          version: "vNext",
          content: {
            title: "Enter Twitch channel name",
            inputText: "",
            buttons: [
              { label: "Watch" },
              { label: "Back" },
            ],
          },
        });
      }

      return NextResponse.json({
        type: "frame",
        version: "vNext",
        content: {
          title: `Opening ${channel}...`,
          url: `https://streamhub-miniapp.vercel.app/?channel=${channel}`,
        },
      });
    }

    // Ekran startowy (pierwsze wejście)
    return NextResponse.json({
      type: "frame",
      version: "vNext",
      content: {
        title: "Watch any Twitch stream",
        description: "Enter the channel name or open the default Twitch stream.",
        buttons: [
          { label: "Enter channel name" },  // = buttonIndex 0
          { label: "Watch default channel" } // = buttonIndex 1
        ],
        inputText: "",
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Frame error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Twitch Mini-App Frame Endpoint",
    instructions: "Send POST requests only.",
  });
}
