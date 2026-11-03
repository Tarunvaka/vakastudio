# Foretoken Privacy Policy

Version 1.0 · Effective November 6, 2026

## Summary

Foretoken is an iPhone app for real-time AI news, with display-only community forecasts from Manifold, a
play-money forecasting site.

- You can use Foretoken without signing in. The app creates an anonymous guest account on first launch.
- We collect what the app needs to work: your account id, your follows, saves and alert settings, what
  you read in the app (to rank stories for you), your time zone and App Store country, your push token
  and, if you sign in, your email or Apple sign-in details. If you subscribe, we keep a record of your
  subscription.
- We do not show ads. We do not track you across other companies' apps or websites. We do not use the
  advertising identifier (IDFA). We do not sell or share your personal data for advertising.
- We do not use your location. Your region comes from your App Store country.
- Usage analytics are anonymous. Crash reports carry no personal data.
- You can delete your account and data in the app at any time: Profile > Delete account (or Delete my
  data if you never signed in).

## Who we are

Foretoken is operated by Nageswararao Vaka, Palakol, Andhra Pradesh, India ("we", "us"). We are the data controller for the
personal data described here, and the "Data Fiduciary" under India's Digital Personal Data Protection
Act, 2023.

Contact for all privacy questions and requests: **support@vakastudio.com**.

## Data we collect

| Data | Why we use it | Linked to your account |
|---|---|---|
| Account id (a random identifier created on first launch) | To keep your follows, saves, settings and subscription | Yes |
| Follows (companies, models, open-source projects), topics you pick at the start, pinned companies and saved stories | To personalize Home, your saved list, your ranking and your alerts | Yes |
| Reading activity in the app: which stories you see, open, read (and for how long), save, share or "show fewer" of, forecast taps and notification opens, where in the app this happened and when | To rank your feed, Today in AI, recaps and alerts for you | Yes |
| Interest weights, a reading fingerprint and a taste group that we derive from the above | To rank stories for you and explain why you see a story | Yes |
| Today in AI progress, streaks and which recaps you have seen | To show Today, your streak and recaps | Yes |
| Alert settings: alert types, daily limit, quiet hours, keywords | To decide which alerts to send you and when | Yes |
| Time zone | To respect your quiet hours and daily alert limit | Yes |
| App Store country, device region setting and the region we derive (India, or United States rules for every other country) | To apply the right regional rules to content and prices | Yes |
| Push token, push environment, app version and iOS version | To deliver alerts through Apple's push service | Yes |
| Notification history: which stories and other notifications we sent you, and when you read or opened them | To show your notifications inbox and apply your daily limit | Yes |
| Email address, if you sign in with an email code | To sign you in | Yes |
| Apple user identifier and the email Apple shares with us (your real address or a private relay address), if you use Sign in with Apple | To sign you in | Yes |
| Sign in with Apple refresh token, stored encrypted | Only to revoke Foretoken's access at Apple when you delete your account | Yes |
| Subscription records, if you subscribe: product, status, renewal and expiry dates, trial details, App Store country and Apple's transaction identifiers; trial events (for example "reminder sent"); offer codes you redeem | To confirm your Premium access, send your trial reminder and count offer campaigns | Yes |
| Referral code and referral status, if referrals are offered and you use them | To give both people the referral reward | Yes |
| Story reports: the reason you pick and an optional note (up to 280 characters) | To review and fix errors in our summaries | Yes, until you delete your account |
| Crash and performance reports: technical details such as the error, device model, iOS and app version | To find and fix bugs | No |
| Anonymous usage events, such as "app opened", "story shared" or "paywall shown", with fixed values only | To understand which features are used | No |

We do not collect your name, phone number, postal address, contacts, photos, precise or approximate
location, browsing history, search history, health data or payment card details.

Please do not put personal information in a story report note.

### Usage analytics

We use TelemetryDeck for anonymous product analytics. The app never gives TelemetryDeck an account id,
email or any other identifier of ours. Events carry only fixed values (for example a screen name or
"true"/"false"), never story text, search terms, notes or emails. Your reading activity (above) goes only
to our own server, never to TelemetryDeck or Sentry.

### Crash reports

We use Sentry for crash and error reports. Before a report leaves the app or our server, we remove any
user information, IP address, request headers, cookies, query strings and request bodies.

### Search

Search terms are sent to our server only to return results. We do not store them and we do not log them.
Your reading activity may record that a story was opened from Search, never what you searched for.

### Server logs

Our server keeps short technical logs to run and protect the service. API logs record the route, the
status and timing, never search terms, tokens or emails. Our web proxy log records the IP address, the
requested path (without search terms) and the app or browser version; these logs are rotated
automatically and overwritten after a limited size (50 MB). We also limit request rates per IP address and
per account in memory; these counters are not stored.

### Images and source links

Story images are loaded directly from the sites that published them (for example GitHub, Hugging Face,
YouTube or news sites). Those sites receive your IP address when an image loads. We send no cookies and no
referrer with these requests and we store no cookies from those sites. When you open a source, it opens in
Apple's in-app browser, and that site's own privacy policy applies.

## Accounts and sign-in

- **Guest account.** On first launch the app signs in anonymously with Supabase, our sign-in provider.
  Your follows, saves, settings and subscription belong to this guest account.
- **Signing in is optional.** You can sign in with Apple or with a one-time code sent to your email. With
  Sign in with Apple we ask only for your email address, never your name, and you can choose Apple's
  Hide My Email. Email codes are delivered by Resend.
- **Moving guest data.** When you sign in, your guest data moves into your account. If you already have an
  account (for example on another device), we merge the guest's data into it, and the guest record is
  removed 30 days later.
- **Sign in with Apple token.** When you sign in with Apple, we may store a refresh token issued by Apple,
  encrypted with AES-256-GCM. We use it only to revoke Foretoken's access at Apple when you delete your
  account.
- Supabase keeps a security log of sign-in events, which can include the IP address used to sign in.

## Personalisation and reading signals

**What:** the reading activity listed above. **Why:** to rank your feed, Today in AI, recaps and alerts for
you. **Who:** only Foretoken's own ranking uses it; it is never sold, never used for ads, never combined
with other companies' data and is not tracking. Raw activity is deleted after 90 days. Your interest
weights and reading fingerprint are kept while your account exists, and are deleted 90 days after your
last subscription ends without renewal. Taste groups are used only when they have 20 or more members, and
nobody can see who read what.

Your controls: **Why am I seeing this?**, **Show fewer like this**, **Reset my interests** (Profile) and the
**Latest** order, which shows every story in time order.

## Shared-story links

When you share a story, the link contains only the story's id. Someone opening it sees a preview of that
story; the link tells us nothing about you as the sender.

## Purchases

Foretoken Premium is a subscription sold through the App Store, with a free trial for eligible new
subscribers: 14 days on the annual plan and 7 days on the monthly plan. We send one reminder 2 days before
the trial ends.

Apple processes your payment; we never see or store your card or payment details. When you buy, the app
sends Apple's signed transaction to our server, and Apple sends us updates about your subscription
(renewal, expiry, refund). We store the records listed above to know whether you have Premium. We pass our
account id to Apple with the purchase (as the "app account token") so that a purchase stays with your
account. We also keep, for 90 days, a log of Apple's subscription notifications that contains Apple's
transaction identifiers but not our account id.

## Push notifications

If you allow notifications, the app registers a push token with us and we send alerts through Apple Push
Notification service. Push messages never contain forecasts. You can turn notifications off at any time
in iOS Settings > Notifications > Foretoken, or change alert types in the app.

## How we use data and our legal bases

We use personal data only to provide Foretoken: to keep your account and settings, rank stories for you,
send the alerts you choose, apply the right regional rules, provide Premium, answer your requests, keep the
service secure and fix bugs.

Where the EU or UK GDPR applies, our legal bases are: performance of our contract with you (account,
personal ranking, alerts, Premium); our legitimate interests in running a secure, working app (security
logs, crash reports, anonymous analytics); and your consent where iOS asks for it (push notifications),
which you can withdraw at any time. Where India's DPDP Act applies, we process your data for the specified
purposes above, based on your consent given by using the app and the choices you make in it, and you may
withdraw consent by deleting your account.

Personal ranking orders the stories you see; it does not make decisions about you that have legal or
similarly significant effects.

## Processors

We use these service providers to run Foretoken. Each processes data only on our instructions and only
for the purpose listed.

| Provider | What it does for us | Where |
|---|---|---|
| Supabase | Database and sign-in | Amazon Web Services, Stockholm, Sweden |
| Hetzner | Servers that run our API, background jobs and backups | Helsinki, Finland |
| Apple | Sign in with Apple, push notifications, App Store payments | Apple |
| Sentry | Crash and error reports (with personal data removed) | Sentry |
| TelemetryDeck | Anonymous usage analytics | TelemetryDeck |
| Resend | Delivers email sign-in codes | Resend |
| Cloudflare | DNS, hosting of our web pages and routing of our email | Cloudflare |

Some of these providers are based in, or use infrastructure in, the United States and other countries.
Where the GDPR applies, transfers outside the European Economic Area rely on the provider's adequacy
status or standard contractual clauses.

**No user data goes to:** the AI service that helps write our story summaries from public news only;
Manifold, whose public forecasts our server reads; or the news sites, company blogs and code sites our
server reads. Our server fetches all of this public data itself.

We do not sell personal data. We do not share personal data for cross-context behavioral advertising or
for any advertising.

## Retention

| Data | How long we keep it |
|---|---|
| Guest accounts | Deleted automatically after 90 days without use, unless they hold an active subscription |
| Signed-in accounts and their follows, saves and settings | Until you delete them or your account |
| Notification history | 30 days |
| Reading activity | 90 days |
| "Show fewer" choices | 90 days |
| Interest weights and reading fingerprint | While your account exists; deleted 90 days after your last subscription ends without renewal |
| Push ranking decisions | 14 days |
| Today in AI progress | 60 days |
| Recap views | 90 days |
| Subscription records | Until you delete your account |
| Trial events | 400 days, or until you delete your account |
| Offer-code redemptions | 25 months; the link to you is removed when you delete your account |
| Apple subscription notification log (no account id) | 90 days |
| Story report notes | Removed 180 days after we resolve the report; the report itself loses its link to you when you delete your account |
| Merged guest records | 30 days after the merge |
| Deletion records (account id and status only) | 30 days after the deletion completes |
| Server proxy logs | Overwritten automatically after a limited size (50 MB) |
| Encrypted database backups | Rotated automatically; a deleted record can remain in encrypted backups for up to 14 days |

## Deletion

You can delete your data at any time:

- **In the app:** Profile > **Delete account** (signed in) or **Delete my data** (guest), then confirm.
- **By email:** write to support@vakastudio.com from the address you sign in with, or include the Support ID from
  Profile > Copy support ID.

When you delete, we remove your account data from our database immediately: follows, saves, alert
settings, devices, notification history, reading activity, interest weights, reading fingerprint,
taste-group membership, Today and recap progress, streaks, trial events, referral records, subscription
records and your encrypted Apple token. Your story reports and offer-code redemptions stay, without any
link to you. We then revoke Foretoken's Sign in with Apple access and delete your sign-in record at
Supabase, usually within minutes; if a step fails, we retry automatically. Encrypted backups expire as
described under Retention.

**Deleting your account does not cancel an App Store subscription.** Cancel it in iOS Settings > [your
name] > Subscriptions. After deleting, you can keep using the app as a new guest.

## Children

Foretoken is intended for people aged 18 and over. It is not directed at children, and we do not
knowingly collect personal data from anyone under 18. If you believe a person under 18 has used
Foretoken, contact us and we will delete the data.

## Your rights

Depending on where you live, you may have the right to access, correct, delete or receive a copy of your
personal data, to object to or restrict some processing, and to withdraw consent. To use any of these
rights, email support@vakastudio.com. We answer within 30 days. We may ask you to confirm that the account is
yours (for example by writing from your sign-in email or sending your Support ID).

- **India (DPDP Act, 2023):** you may access a summary of your data, correct or erase it, nominate another
  person to exercise your rights, and raise a grievance. Grievance contact: Nageswararao Vaka,
  support@vakastudio.com. If you are not satisfied with our answer, you may complain to the Data Protection
  Board of India.
- **EU, EEA and UK (GDPR):** you may also complain to your local data protection authority.
- **UK (UK GDPR), Australia (Privacy Act 1988) and the other countries where Foretoken is available:** you
  have the same rights to access and delete your data and to contact us at support@vakastudio.com, and you may
  complain to your local privacy regulator (in the UK, the ICO; in Australia, the OAIC).
- **California and other US states:** we do not sell or share personal information, and we do not use
  sensitive personal information to infer characteristics about you. You will not be treated differently
  for using your rights. An authorized agent may make a request for you with your written permission.

## Security

Data is encrypted in transit (HTTPS). The Sign in with Apple token is encrypted at rest with AES-256-GCM,
and database backups are encrypted. Access to our systems is limited to the operator. No system is
perfectly secure; if a breach affects your personal data, we will notify you and the authorities as the
law requires.

## Changes

We date every version of this policy. If we make a material change, we will update the effective date and
tell you in the app before the change takes effect.

## Contact

Nageswararao Vaka · Palakol, Andhra Pradesh, India · support@vakastudio.com
