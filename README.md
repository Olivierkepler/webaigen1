This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


---------------Oreganitsation for  the chatbot--------------------
         files add  for  the chatbot:
         1. app/components/Chatbot.tsx: 
            to use this install: npm install react-markdown remark-gfm rehype-highlight highlight.js
         2. app/components/EstimatroPanel.tsx
         3. utils/generatePDF.ts: 
            to use this install: npm install jspdf jspdf-autotable
         4. .env.local
         5. app/api/chat/route.ts: 
            to use this install: npm install openai
         6. data/mock.json



____________________________core mission_________________________

WebAiGen — Market Focus & Profit Strategy
Core Market Need
Businesses don’t just need websites — they need:
More leads
More sales
Less manual work
Faster operations
Data-driven decisions
WebAiGen focuses on building AI-powered systems that increase revenue and automate business workflows.
High-Demand Services (Primary Revenue Areas)
1. AI Business Automation
Automate repetitive and time-consuming operations:
Lead capture → CRM automation
Email and follow-up automation
Appointment scheduling systems
Customer onboarding workflows
Data processing and reporting
Proposal and document generation
Value: Saves time and reduces operational costs
Revenue model: Setup + monthly maintenance
2. AI Chatbots (Revenue & Support)
Deploy intelligent assistants that:
Answer customer questions
Qualify leads
Book appointments
Recommend products/services
Provide 24/7 support
Target industries
Real estate
Healthcare clinics
Law firms
Coaches/consultants
E-commerce businesses
3. Conversion-Focused Websites
Build websites designed to generate business results:
High-performance landing pages
Full business websites
E-commerce platforms
AI-powered lead capture
Integrated chat and automation
Analytics and performance tracking
Positioning: Websites that generate revenue, not just design.
4. AI Marketing Systems
Automate content and growth operations:
AI blog generation
SEO optimization pipelines
Social media content automation
Email marketing automation
Lead nurturing workflows
Revenue potential: Recurring monthly services
5. Custom AI & Machine Learning Solutions
Develop intelligent systems tailored to business needs:
Prediction models
Recommendation engines
Image or text analysis
Data intelligence dashboards
Custom business decision tools
Example applications
Food analysis or recommendation systems
Customer behavior prediction
Sales forecasting
Positioning: Turn business data into actionable intelligence.
Target Customers
Focus on industries that benefit most from automation:
Coaches & consultants
Small business owners
Healthcare providers
Real estate professionals
E-commerce brands
Restaurants & food businesses
Startups and SaaS founders
What WebAiGen Does NOT Focus On
Low-value, saturated services:
Basic static websites
Portfolio-only sites
Low-cost design-only projects
Non-automation web work
Core Value Proposition
WebAiGen helps businesses:
Automate operations
Increase conversions and revenue
Reduce manual work
Launch faster
Use AI to make smarter decisions
Mission Direction
WebAiGen builds AI-powered business systems that automate operations, increase revenue, and transform ideas into scalable digital products.
Positioning Statement
WebAiGen combines high-performance web development, AI automation, and custom machine learning to help businesses operate smarter, grow faster, and scale efficiently.




The structure for Core Automation

                        User Action
                           ↓
                        Frontend (Website / Chat / Form)
                           ↓
                        API / Backend Logic
                           ↓
                        Processing Layer
                           • Validation
                           • AI (optional)
                           ↓
                        Integrations
                           • Google Sheets / CRM
                           • Email Service
                           • Google Calendar
                           • Database (optional)
                           ↓
                        Automated Actions





_______________________________code structure_________________________________

WebAiGen AI Automation (Code Structure)
├─ app/
│  ├─ api/
│  │  ├─ leads/route.ts                 # POST: capture lead, validate, store, trigger automations
│  │  ├─ schedule/route.ts              # POST: create Google Calendar event (or return booking options)
│  │  ├─ chat/route.ts                  # POST: chatbot (LLM) responses
│  │  ├─ webhook/
│  │  │  ├─ stripe/route.ts             # optional: payments/subscriptions
│  │  │  └─ calendar/route.ts           # optional: calendar push notifications
│  │  └─ health/route.ts                # GET: uptime/monitoring
│  │
│  ├─ (site)/
│  │  ├─ page.tsx                       # landing/home
│  │  ├─ services/page.tsx              # services page
│  │  └─ contact/page.tsx               # contact page (lead form)
│  │
│  ├─ (dashboard)/                      # optional: admin portal
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                       # overview
│  │  ├─ leads/page.tsx                 # leads table (reads from Sheets/DB)
│  │  └─ automations/page.tsx           # workflow status + logs
│  │
│  ├─ layout.tsx                        # root layout (Navbar, cursor, etc.)
│  └─ globals.css
│
├─ components/
│  ├─ chatbot/
│  │  ├─ Chatbot.tsx                    # your UI (messages + input)
│  │  ├─ MessageBubble.tsx              # presentational
│  │  ├─ MarkdownRenderer.tsx           # react-markdown config
│  │  └─ useChatScroll.ts               # scroll-to-bottom + keyboard handling hooks
│  │
│  ├─ scheduling/
│  │  ├─ ScheduleModal.tsx              # UI for selecting availability
│  │  ├─ AvailabilityPicker.tsx         # date/time grid
│  │  └─ timezone.ts                    # timezone utilities
│  │
│  ├─ estimator/
│  │  ├─ EstimatorPanel.tsx             # your calculator UI
│  │  └─ pricing.ts                     # pricing logic + add-on costs
│  │
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Modal.tsx
│  │  └─ Input.tsx
│  │
│  └─ Navbar.tsx
│
├─ lib/
│  ├─ env.ts                            # env var validation
│  ├─ validators/
│  │  ├─ lead.ts                        # zod schema for lead payloads
│  │  └─ schedule.ts                    # zod schema for booking payloads
│  │
│  ├─ automations/
│  │  ├─ orchestrator.ts                # runs "LeadReceived" workflow steps
│  │  ├─ steps/
│  │  │  ├─ saveLead.ts                 # save to Sheets/DB
│  │  │  ├─ sendEmail.ts                # email confirmation + followups
│  │  │  ├─ notifyTeam.ts               # Slack/SMS/Discord
│  │  │  ├─ upsertCRM.ts                # HubSpot/Airtable optional
│  │  │  ├─ createCalendarHold.ts       # optional: calendar hold
│  │  │  └─ logEvent.ts                 # structured logs
│  │  └─ types.ts                       # workflow types
│  │
│  ├─ integrations/
│  │  ├─ google/
│  │  │  ├─ auth.ts                     # OAuth/service account helpers
│  │  │  ├─ calendar.ts                 # create/list events, freebusy
│  │  │  └─ sheets.ts                   # append/read rows
│  │  ├─ email/
│  │  │  ├─ resend.ts                   # Resend client
│  │  │  └─ templates/
│  │  │     ├─ leadConfirmation.tsx      # email templates
│  │  │     └─ followup.tsx
│  │  └─ llm/
│  │     ├─ client.ts                   # OpenAI client wrapper
│  │     └─ prompts.ts                  # system prompts
│  │
│  ├─ db/
│  │  ├─ index.ts                       # DB client (optional)
│  │  └─ models.ts                      # Prisma/Drizzle models (optional)
│  │
│  └─ logging/
│     ├─ logger.ts                      # console/json logger
│     └─ redact.ts                      # remove sensitive fields
│
├─ utils/
│  ├─ generatePDF.ts                    # jsPDF/autoTable export
│  ├─ format.ts                         # helpers
│  └─ rateLimit.ts                      # basic rate limiting for api routes
│
├─ config/
│  ├─ services.ts                       # service catalog (web, automation, ML)
│  └─ pricing.ts                        # pricing constants
│
├─ middleware.ts                         # optional: auth, rate limit, security headers
├─ .env.example                          # required env vars list
└─ README.md




_________________________The authentification structure ____________________

app/
  api/auth/[...nextauth]/route.ts     # Auth.js endpoint
  (auth)/
    login/page.tsx                    # Sign-in page
  (dashboard)/
    dashboard/page.tsx                # User dashboard
    dashboard/settings/page.tsx
  (admin)/
    admin/page.tsx                    # Admin dashboard
    admin/users/page.tsx
    admin/logs/page.tsx
lib/
  auth.ts                             # auth config + helpers
  access.ts                           # role checks / route guards
db/
  schema.ts                           # user model with role
middleware.ts                         # protect /dashboard + /admin
