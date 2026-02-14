import { baseURL } from "@/resources";
import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Bayu Saputra Portfolio

> IT Infrastructure Engineer portfolio focused on network reliability, observability, and IoT operations.

## Primary Pages
- Home: ${baseURL}/
- About: ${baseURL}/about
- Work: ${baseURL}/work
- Blog: ${baseURL}/blog
- Certifications: ${baseURL}/badges

## Expertise
- Network operations (L1/L2 troubleshooting, LAN/WAN, routing/switching)
- Monitoring and observability (ICCC, ITMS, Grafana, The Dude)
- IoT field operations (sensors, CCTV, incident response)
- Infrastructure reliability and root cause analysis

## Contact
- Email: mailto:bayusaputra.005.003@gmail.com
- LinkedIn: https://linkedin.com/in/bayusaputra05
- GitHub: https://github.com/bayu5aputra
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
