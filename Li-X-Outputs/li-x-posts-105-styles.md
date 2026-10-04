# 210 LinkedIn + 210 X Posts. 105 Storytelling Styles

Topics rotate across GCP, GKE, Terraform Enterprise, Flux GitOps, Kustomize, GitHub Actions DevSecOps, PLGT observability, Grafana Cloud, SRE, system design, AI-assisted DevOps and career.

Note: These drafts are based on the MMS Payment Platform work listed in the portfolio (TFE blueprint, Flux and Kustomize GitOps, GKE, Cloud Armor, WIF, CIS and CVE fixes, PLGT with SLOs) and earlier roles. Numbers and small story details are illustrative. Please check each one against real events before posting, and keep anything confidential out.

Rules used: LinkedIn posts have no hashtags. X posts have exactly 2 hashtags, stay under 280 characters, and use multiple lines.

---

## 1. Postmortem / "what went wrong"

### Post 1. Topic: A Kustomize patch that broke QA

#### LinkedIn

Last month, one small YAML line took down our QA payment UI for 40 minutes.

What happened:
We moved a Kustomize patch from the base folder to the QA overlay.
The patch had the wrong namespace.
Flux applied it without any error.
The pod just never got the new config.

What went wrong:
No one checked the rendered output.
We only looked at the diff in the PR.

What we fixed:
1. A GitHub Actions step now runs kustomize build for every overlay.
2. The PR shows the final YAML, not just the change.
3. Flux alerts now go to our team channel, not an inbox nobody reads.

The YAML looked right. The output was wrong.
Now we always check the output.

#### X

One YAML line broke our QA payment UI for 40 min.

Wrong namespace in a Kustomize patch.
Flux applied it. No error.

Fix: render every overlay in CI.

Check the output, not the diff.

#GitOps #Kubernetes

### Post 2. Topic: The alert that never fired

#### LinkedIn

Our alert did not fire. That was the incident.

A service in QA was failing card checks for almost an hour.
The dashboard was green.

Why? We renamed a label in our ServiceMonitor.
Prometheus kept scraping. The alert rule kept looking for the old label.
No data means no alert.

What we learned:
An alert that sees nothing is not a happy alert. It is a blind alert.

What we changed:
1. Every key alert now has an absent() partner rule.
2. Label changes get the same review as code.
3. Once a month, we break something on purpose to see if the alerts ring.

Green does not always mean good. Sometimes green means we are not looking.

#### X

Our alert did not fire. That was the real incident.

We renamed one label.
The alert rule looked for the old one.
No data = no alert.

Now every key alert has an absent() partner.

Green can also mean blind.

#Observability #Prometheus

---

## 2. Imaginary dialogue / conversation

### Post 1. Topic: Why not kubectl apply in prod

#### LinkedIn

Dev: Can I just run kubectl apply in prod? It is one small fix.
Me: What happens when Flux syncs again?
Dev: It... puts back the old version?
Me: Yes. Git wins. Always.
Dev: So the fix disappears?
Me: The fix disappears. And nobody knows why the bug came back.
Dev: Okay. So what now?
Me: Open a PR. It takes 10 minutes. It goes to QA first. Then prod.
Dev: That feels slow.
Me: Slow is 3 hours of chasing a bug that came back from the dead.

That is GitOps in one chat.
Git is the boss. The cluster just listens.

#### X

Dev: Can I kubectl apply in prod? Tiny fix.
Me: Flux will undo it on next sync.
Dev: So the fix disappears?
Me: And the bug comes back. Quietly.

Open a PR. 10 minutes.
Git is the boss.

#GitOps #DevOps

### Post 2. Topic: A chat with a Terraform plan

#### LinkedIn

A chat with my Terraform plan last Tuesday.

Plan: I will change 3 things.
Me: Great.
Plan: And destroy 1.
Me: Wait. Destroy what?
Plan: The GKE node pool in QA.
Me: Why?
Plan: Someone changed the machine type. I cannot change it in place.
Me: So the whole pool goes away?
Plan: Yes. Then I make a new one.
Me: And the pods?
Plan: Not my problem.

That is why I read every plan. Line by line.
"1 to destroy" is the most important line in Terraform Enterprise.

Now we have a policy check that stops any node pool destroy without a second approval.

#### X

Me: Terraform, what changes?
Plan: 3 updates.
Me: Nice.
Plan: And 1 destroy.
Me: Of what?
Plan: The GKE node pool.

Always read the last line of the plan.

#Terraform #GCP

---

## 3. Analogy / metaphor post

### Post 1. Topic: GitOps is a restaurant kitchen

#### LinkedIn

GitOps is like a big restaurant kitchen.

The recipe book is Git.
The chefs are Flux.
The plates going out are our pods.

If a chef changes the salt on their own, the next plate goes back to the recipe.
If we want more salt, we change the recipe book. Then every chef follows it.

No secret changes. No "but it worked yesterday".
Everyone can read the book and see who changed what, and when.

That is why we run payment services this way.
The kitchen is busy. The book keeps it calm.

#### X

GitOps is a kitchen.

Git is the recipe book.
Flux is the chef.
Pods are the plates.

Want more salt?
Change the book, not the plate.

#GitOps #Kubernetes

### Post 2. Topic: Observability is driving at night

#### LinkedIn

Think of observability like driving a car at night.

Metrics are the dashboard. Speed, fuel, heat.
Logs are the black box. What happened, word by word.
Traces are the GPS. Which road did the request take?

A dashboard alone tells us the engine is hot. Not why.
A black box alone is too much to read while driving.
A GPS alone shows the road, not the speed.

With Prometheus, Loki and Tempo together in Grafana, we can click from a red graph to the exact log line to the slow span.

One car. Three views. No guessing in the dark.

#### X

Observability is driving at night.

Metrics = dashboard
Logs = black box
Traces = GPS

One alone is guessing.
All three in Grafana is driving with the lights on.

#Observability #Grafana

---

## 4. Open letter ("Dear junior engineer...")

### Post 1. Topic: Console clicks vs Terraform

#### LinkedIn

Dear junior engineer,

One day someone will ask for a "quick change" in the GCP console.
It will feel faster than writing Terraform.
Please don't do it.

The console change is fast today.
Next week, Terraform will see the drift.
The plan will try to undo it.
Someone will panic in the middle of a release.

Write the code. Open the PR. Let Terraform Enterprise run the plan.
It feels slow at first. After a year, it is the only way that feels safe.

From someone who clicked in the console once and lost a whole Friday fixing it.

#### X

Dear junior engineer,

The GCP console is fast today.
Drift is slow pain tomorrow.

Write the Terraform.
Open the PR.
Let the plan speak.

Signed,
Someone who lost a Friday to one click.

#Terraform #DevOps

### Post 2. Topic: From the platform team to developers

#### LinkedIn

Dear developers,

We are not here to block releases.

When our pipeline fails a build for a critical CVE, it is not personal.
When a policy says no to a root container, it is not us being strict for fun.

We handle payments. A small hole can cost a lot.

What we promise back:
1. Clear error messages, not riddles.
2. A fix guide for every rule we add.
3. A fast reply when something blocks for no good reason.

We are on the same team. We just stand at different doors.

With love,
The platform team

#### X

Dear developers,

When the pipeline blocks a critical CVE, it is not personal.
It is payments.

Our promise:
Clear errors.
A fix guide per rule.
Fast replies.

Same team, different doors.

#DevSecOps #PlatformEngineering

---

## 5. Prediction ("In 2 years...")

### Post 1. Topic: AI writes Terraform, humans judge plans

#### LinkedIn

In 2 years, I think most Terraform will be first written by AI.

Not because AI is perfect.
Because writing a GKE module from scratch is boring, and AI is good at boring.

But here is what will NOT change:
Someone still has to read the plan.
Someone still has to say yes to "1 to destroy".
Someone still has to know why that IAM role is so wide.

The job moves from typing to judging.

Today I already use AI to draft modules and explain old code.
I never let it press apply.

The best engineers in 2028 will be great reviewers, not fast typers.

#### X

In 2 years, AI will write most Terraform first drafts.

Humans will still:
read the plan,
question the IAM,
stop the destroy.

The job moves from typing to judging.

#AI #Terraform

### Post 2. Topic: Error budgets on the business dashboard

#### LinkedIn

In 2 years, SLOs will sit on the business dashboard, not just ours.

Today, many teams still talk about uptime like a tech number.
But for payments, 99.9% is a money number.
0.1% of a busy shopping day is a lot of failed checkouts.

I see it starting already. Product people ask: "How much error budget is left this month?"
That question used to be only ours.

My guess:
Error budgets will decide release speed.
Managers will read Grafana, not just slides.
Platform teams will be asked "how fast", not just "is it up".

Good. Reliability finally gets a seat at the table.

#### X

In 2 years, error budgets will be on the business dashboard.

For payments, 99.9% is not a tech number.
It is a money number.

Reliability is getting a seat at the table.

#SRE #Observability

---

## 6. Stop doing / start doing

### Post 1. Topic: GitHub Actions security habits

#### LinkedIn

Stop doing / start doing in GitHub Actions.

Stop storing GCP service account keys as secrets.
Start using Workload Identity Federation.

Stop giving one service account access to every project.
Start with one identity per environment.

Stop using actions by tag like @v3.
Start pinning them to a commit SHA.

Stop building a new image for each environment.
Start promoting the same image from Dev to QA to Prod.

Stop scanning only on main.
Start scanning every PR with Trivy.

Small habits. Big drop in risk.

#### X

Stop: JSON keys in GitHub secrets.
Start: Workload Identity Federation.

Stop: actions@v3.
Start: pin to a SHA.

Stop: a new image per env.
Start: promote one image.

#GitHubActions #DevSecOps

### Post 2. Topic: Alert habits

#### LinkedIn

Stop doing / start doing with alerts.

Stop alerting on CPU at 80%.
Start alerting on what users feel: errors and slow requests.

Stop sending every alert to everyone.
Start routing by team and by severity.

Stop writing alerts with no runbook link.
Start adding one line: "What do I do now?"

Stop keeping alerts nobody acts on.
Start deleting them. Yes, deleting.

We cut a lot of noise this way.
The pager got quiet. The real alerts got loud.

#### X

Stop alerting on CPU 80%.
Start alerting on errors and latency.

Stop alerts with no runbook.
Start adding "what do I do now?"

Stop keeping noisy alerts.
Start deleting them.

#SRE #Observability

---

## 7. Comparison (A vs B)

### Post 1. Topic: ArgoCD vs Flux

#### LinkedIn

I have run both ArgoCD and Flux in production. Here is my simple take.

ArgoCD:
Nice UI. Developers love clicking around.
Great for teams new to GitOps.
One central place to see everything.

Flux:
No big UI. Lives quietly inside the cluster.
Feels like a set of small Kubernetes tools.
Works very well with Kustomize and many clusters.

For our payment platform, we picked Flux.
We wanted less magic and more plain YAML.

Neither one is better. The better one is the one the team will actually read and fix at 2 AM.

#### X

ArgoCD vs Flux, after running both:

ArgoCD: great UI, easy start.
Flux: quiet, small parts, Kustomize friendly.

We picked Flux for payments.
Best tool = the one the team can fix at 2 AM.

#GitOps #Kubernetes

### Post 2. Topic: Self-hosted PLGT vs Grafana Cloud

#### LinkedIn

Self-hosted PLGT vs Grafana Cloud. I have done both.

Self-hosted (Prometheus, Loki, Grafana, Tempo on our own cluster):
Full control.
Cheaper on paper.
But someone has to upgrade it, scale it, and fix it when Loki runs out of disk at night.

Grafana Cloud:
No servers to look after.
Easy to start.
But the bill grows with every new label and log line.

My rule:
Small team, many services? Pay for cloud. Time is money.
Big team, strict data rules? Host it, but give it a real owner.

The worst setup is self-hosted with no owner.

#### X

Self-hosted PLGT vs Grafana Cloud:

Self-hosted = control + night shifts.
Cloud = peace + a bill that grows with labels.

Worst option?
Self-hosted with no owner.

#Grafana #Observability

---

## 8. Question-only post (poll style)

### Post 1. Topic: "1 to destroy" in prod

#### LinkedIn

Quick question for platform folks.

A Terraform plan says one resource will be destroyed in prod. What does the team do next?

A) Stop and ask in the team chat
B) Policy check plus a second approval in TFE
C) Read it and apply if it looks fine
D) Plan? We just apply

I will share what we do in the comments after a few answers.

#### X

Terraform plan says "1 to destroy" in prod.

What happens next?

A) Stop and ask
B) Policy + 2nd approval
C) Read and apply
D) What plan?

#Terraform #DevOps

### Post 2. Topic: How many alerts were real

#### LinkedIn

Honest poll.

How many alerts in last week's on-call needed a real action?

A) Almost all of them
B) About half
C) Less than a quarter
D) We stopped counting

Asking because we did this count once. The answer surprised the whole team.

#### X

Poll:
How many alerts last week needed a real action?

A) Almost all
B) Half
C) Under 25%
D) Stopped counting

We counted once. It hurt.

#SRE #Observability

---

## 9. Quote or one-line wisdom

### Post 1. Topic: Git as the only truth

#### LinkedIn

If it is not in Git, it does not exist.

That is the line I repeat most in our team.

Console change? Not real.
Manual kubectl patch? Not real.
Hotfix from a laptop? Not real.

Flux will roll it back. Terraform will call it drift. And the next person will never know it happened.

Write it down in Git. Then it is real.

#### X

If it is not in Git, it does not exist.

Console click? Gone on next sync.
kubectl patch? Gone.
Laptop hotfix? Gone.

#GitOps #DevOps

### Post 2. Topic: Dashboards nobody opens

#### LinkedIn

A dashboard nobody looks at is just a nice picture.

We had around 40 dashboards in Grafana. Most were made once and never opened again.

So we cleaned up.
We kept the ones that answer one question each:
Is the payment flow healthy?
Where is it slow?
What changed?

Fewer dashboards. More looking.
That is when observability started to work.

#### X

A dashboard nobody looks at is just a nice picture.

We deleted most of ours.
Kept only the ones that answer one clear question.

#Grafana #Observability

---

## 10. Behind the scenes / day in the life

### Post 1. Topic: A day on a payment platform

#### LinkedIn

A normal day for me as a senior platform engineer on a payment platform.

8:30. Coffee. Check Grafana. Any red in the night?
9:00. Review 3 PRs. Two Terraform, one Flux change.
10:00. Stand-up. A dev team needs a new GCP project for QA.
11:00. Write the Terraform for it. TFE runs the plan.
13:00. Lunch and a short walk.
14:00. Trivy found a critical CVE in a base image. Fix, rebuild, promote.
15:30. Call with security about CIS benchmark results.
16:30. Write docs for today's work, so future me does not suffer.
17:30. Laptop closed. Running shoes on.

Not much drama. That is the goal.

#### X

My day on a payment platform:

8:30 Grafana check
9:00 PR reviews
11:00 Terraform for a new project
14:00 Fix a critical CVE
16:30 Write docs
17:30 Run

Boring days = good platform.

#PlatformEngineering #DevOps

### Post 2. Topic: Behind one checkout button

#### LinkedIn

Behind the scenes of one payment UI release.

What people see: a new button on the checkout page.

What happens behind it:
1. The dev opens a PR.
2. GitHub Actions builds the image and runs tests.
3. Trivy scans it. No critical CVEs allowed.
4. The image goes to Artifact Registry with a fixed tag.
5. A PR updates the Dev overlay. Flux picks it up.
6. The same image moves to QA. Testers check it.
7. The same image moves to Prod. Flux rolls it out with zero downtime.
8. We watch the SLO dashboard for 30 minutes.

One button. Eight steps. Nobody notices. Perfect.

#### X

One new checkout button.
Behind it:

Build
Scan
Push to Artifact Registry
Flux to Dev
Same image to QA
Same image to Prod
Watch SLOs

Nobody notices. Perfect.

#GitOps #DevSecOps

---

## 11. Career advice / roadmap

### Post 1. Topic: Roadmap to senior platform engineer

#### LinkedIn

If I had to plan a path to senior platform engineer, here is how I would do it.

Step 1: Linux and networking. DNS, TLS, how a request travels.
Step 2: One cloud, deep. For me it is GCP.
Step 3: Terraform. Modules, state, plans. Then Terraform Enterprise for teams.
Step 4: Kubernetes, then GKE. Learn why pods die, not only how to start them.
Step 5: CI/CD with security inside it. GitHub Actions, scans, signed images.
Step 6: GitOps. Flux or ArgoCD.
Step 7: Observability. Metrics, logs, traces, SLOs.
Step 8: People skills. Docs, reviews, saying no kindly.

Step 8 took me the longest.

#### X

Path to senior platform engineer:

1 Linux + networking
2 One cloud, deep
3 Terraform
4 Kubernetes
5 Secure CI/CD
6 GitOps
7 Observability
8 People skills

Step 8 took me the longest.

#DevOps #CareerGrowth

### Post 2. Topic: Working in Germany as a DevOps engineer

#### LinkedIn

Career advice for engineers who want to work in Germany.

1. Learn some German, even if the job is in English. Daily life is in German.
2. Keep the CV short and clear. Two pages. Facts, not stories.
3. Certifications help get the call. Real projects win the interview.
4. Platform and DevSecOps roles are in demand. Security knowledge stands out.
5. Save money before the move. Job gaps happen. Mine did, in the middle of winter.
6. Build a network early. Meetups, LinkedIn, old colleagues.

Germany rewards patience. It took me time. It was worth it.

#### X

Moving to Germany as a DevOps engineer?

Learn some German.
Short, factual CV.
Show real projects.
Save money for gaps.
Network early.

I lost my job mid-winter once. Patience won.

#Germany #DevOps

---

## 12. Mistakes I made in X years

### Post 1. Topic: 16 years of infra mistakes

#### LinkedIn

Mistakes I made in 16 years of infrastructure work.

1. I thought more tools meant a better platform. It meant more things to fix.
2. I wrote docs at the end. So they never got written.
3. I said yes to every request. Then I could not finish any of them well.
4. I trusted green dashboards without testing the alerts.
5. I gave service accounts too much access "just for now". Now never ends.
6. I fixed things in the console during incidents and forgot to put them in Terraform.
7. I worked late to prove myself. It only made me tired.

Each one taught me something. Some taught me twice.

#### X

Mistakes from 16 years in infra:

More tools is not a better platform.
Docs at the end = no docs.
"Just for now" access lasts forever.
Untested alerts lie.
Late nights prove nothing.

#DevOps #CareerGrowth

### Post 2. Topic: First-year GitOps mistakes

#### LinkedIn

Mistakes I made in my first year with GitOps.

1. One giant folder for all environments. One typo hit all of them.
2. No Kustomize overlays. Just copy and paste YAML for Dev, QA and Prod. They slowly drifted apart.
3. Secrets in plain YAML "only in Dev". Dev became QA. QA became a problem.
4. Ignoring Flux events. Failed syncs sat there for days.
5. Too many automatic image updates. Prod got versions nobody tested.

Today: base plus overlays, secrets from Secret Manager, Flux alerts to chat, and promotion by PR only.

Each rule has a scar behind it.

#### X

My first-year GitOps mistakes:

Copy-paste YAML per env
Secrets in plain YAML "just in Dev"
Ignoring Flux events
Auto image updates to prod

Every rule we have now has a scar behind it.

#GitOps #Kubernetes

---

## 13. Tool or resource list

### Post 1. Topic: Weekly GCP platform toolkit

#### LinkedIn

Tools I use almost every week as a platform engineer on GCP.

Terraform Enterprise. Plans, policies and runs in one place.
Flux and Kustomize. GitOps for every environment.
GitHub Actions. Build, test, scan, promote.
Trivy. Scans images and IaC.
Artifact Registry. One home for every image.
Prometheus, Loki, Tempo and Grafana Cloud. See everything.
k9s. A fast look inside a cluster.
tflint. Catches Terraform mistakes early.
An AI assistant in the terminal. To explain old code and draft first versions.

No tool fixes a bad process. But good tools make a good process easy.

#### X

My weekly GCP platform toolkit:

Terraform Enterprise
Flux + Kustomize
GitHub Actions
Trivy
Artifact Registry
Grafana Cloud + PLGT
k9s
AI in the terminal

Tools don't fix bad process.

#DevOps #GCP

### Post 2. Topic: Free learning resources

#### LinkedIn

Free resources that helped me grow in cloud and DevOps.

Google Cloud Skills Boost. Hands-on labs on real GCP.
The Kubernetes docs. Better than most courses.
The Google SRE books. Free to read online.
Flux docs and examples on GitHub.
Grafana's own blog and webinars.
HashiCorp tutorials for Terraform.
Conference talks on YouTube, like KubeCon.

And one paid thing I do not regret: a small home lab. Breaking things on my own is the best teacher.

#### X

Free stuff that grew my cloud career:

Google Cloud Skills Boost
Kubernetes docs
Google SRE books
Flux docs
KubeCon talks on YouTube

Best teacher? Breaking my own lab.

#Cloud #DevOps

---

## 14. Carousel / PDF slides

### Post 1. Topic: Moving one image from Dev to Prod

#### LinkedIn

Carousel: How we move one image from Dev to Prod

Slide 1: One image. Three environments. Zero rebuilds.
Slide 2: Build once in GitHub Actions. Tag it with the commit SHA.
Slide 3: Scan it with Trivy. Critical CVE? Stop here.
Slide 4: Push it to Artifact Registry.
Slide 5: PR to the Dev overlay. Flux deploys it.
Slide 6: Tests pass? PR to QA with the same tag.
Slide 7: Sign-off? PR to Prod. Watch the SLOs.
Slide 8: Why? What we test is exactly what we ship.

Caption: Saving this for the next time someone asks to "just rebuild for prod".

#### X

Build once.
Scan once.
Promote the same image Dev to QA to Prod.

Never rebuild for prod.
What we test is what we ship.

(Full carousel on LinkedIn)

#GitOps #CICD

### Post 2. Topic: Our Terraform Enterprise layout

#### LinkedIn

Carousel: Our Terraform Enterprise setup in 7 slides

Slide 1: One blueprint. Many projects. No snowflakes.
Slide 2: Modules live in a private registry with versions.
Slide 3: One workspace per environment per stack. Dev, QA, Prod.
Slide 4: Variable sets for shared values like region and labels.
Slide 5: Policies check every plan. No public buckets. No owner roles.
Slide 6: A GitHub PR triggers a plan. A merge triggers the apply.
Slide 7: Drift checks run on a schedule.

Caption: Boring structure is what lets a team move fast.

#### X

Our TFE layout:

Versioned modules
1 workspace per env per stack
Shared variable sets
Policy checks on every plan
PR = plan, merge = apply

Boring structure = fast team.

#Terraform #PlatformEngineering

---

## 15. Screenshot or diagram post

### Post 1. Topic: The shape of a payment platform on GCP

#### LinkedIn

Diagram post: the simple shape of our payment platform on GCP.

[Image: a diagram with these boxes, top to bottom]

Internet
Cloud Armor (blocks bad traffic)
Load Balancer
GKE (payment services and UIs)
Secret Manager and databases next to GKE
Artifact Registry feeding images in
Flux inside GKE, watching Git
Prometheus, Loki and Tempo sending data to Grafana

Each environment, Dev, QA and Prod, has its own project with the same shape.

Same picture three times. That is the whole trick.

#### X

Our payment platform, as one picture:

Internet
Cloud Armor
Load Balancer
GKE
Flux watching Git
PLGT into Grafana

Same shape in Dev, QA and Prod.
That is the trick.

#GCP #Kubernetes

### Post 2. Topic: The Grafana board I open first

#### LinkedIn

Screenshot post: the one Grafana dashboard I open first every morning.

[Image: a Grafana dashboard with four panels]

Panel 1: Success rate of payment requests. Target 99.9%.
Panel 2: p95 latency. Green line under the red line.
Panel 3: Error budget left this month.
Panel 4: Recent deploys, marked on the graph.

That last panel is my favourite. When a graph jumps, I first look for a deploy marker right before it.

Most of the time, the answer is right there.

#### X

The one Grafana board I open first:

Success rate
p95 latency
Error budget left
Deploy markers

Graph jumps? Look for a deploy marker right before it.
Usually that is the answer.

#Grafana #SRE

---

## 16. Mini tutorial with a command or code snippet

### Post 1. Topic: Three Flux commands for stuck deploys

#### LinkedIn

Mini tutorial: three Flux commands I use when something is not deploying.

1. See what is stuck:
flux get kustomizations -A

2. Force a sync now, not in 10 minutes:
flux reconcile kustomization payments --with-source

3. See the real error:
flux logs --kind=Kustomization --name=payments

Most of the time, step 3 shows a bad patch or a missing secret.

Saving these has saved me many times.

#### X

Flux not deploying? I run:

flux get ks -A
flux reconcile ks payments --with-source
flux logs --kind=Kustomization

Step 3 shows the real error most of the time.

#Flux #GitOps

### Post 2. Topic: GitHub Actions to GCP with no JSON key

#### LinkedIn

Mini tutorial: GitHub Actions to GCP without a JSON key.

permissions:
  id-token: write
  contents: read

steps:
  - uses: google-github-actions/auth@v2   (pin to a SHA in real life)
    with:
      workload_identity_provider: projects/123/locations/global/workloadIdentityPools/gh/providers/github
      service_account: deployer@my-project.iam.gserviceaccount.com

That is it.
No key to leak. No key to rotate.
GitHub gives a short-lived token. GCP checks it. Done.

One more tip: lock the provider to our repo and branch with an attribute condition. Otherwise other repos could try to use it.

#### X

GitHub Actions to GCP, no JSON key:

id-token: write
google-github-actions/auth
workload_identity_provider

Short token.
Nothing to leak.
Nothing to rotate.

#GitHubActions #GCP

---

## 17. Quiz / "Spot the bug"

### Post 1. Topic: An IAM binding that removes people

#### LinkedIn

Spot the bug. This Terraform looks fine. It is not.

resource "google_project_iam_binding" "viewers" {
  project = "payments-prod"
  role    = "roles/viewer"
  members = ["group:payments-team@example.com"]
}

Hint: think about who else had the viewer role before this ran.

Answer in the comments tomorrow.

#### X

Spot the bug:

google_project_iam_binding
role = roles/viewer
members = [one group]

Hint: who else had viewer before this ran?

#Terraform #GCP

### Post 2. Topic: A weak Prometheus alert

#### LinkedIn

Quiz time. What is wrong with this alert?

- alert: PaymentErrorsHigh
  expr: rate(http_requests_total{status="500"}[5m]) > 0.05
  for: 0m

I see three problems.
1. ?
2. ?
3. ?

My answers tomorrow. Let us see who gets all three.

#### X

What is wrong with this alert?

rate(http_requests_total{status="500"}[5m]) > 0.05
for: 0m

I see 3 problems.
How many can we find?

#Prometheus #SRE

---

## 18. Challenge ("Try this for 7 days")

### Post 1. Topic: Delete one alert a day

#### LinkedIn

A 7-day challenge for every on-call team.

Every day, pick one alert.
Ask one question: "When it fired last time, did someone do something?"
If no, delete it or make it quieter.

Day 1 feels scary.
Day 3 feels good.
Day 7 the pager is calmer and people trust it again.

We did this. We removed a big chunk of our alerts and nothing bad happened.

Who is in? Start Monday.

#### X

7-day on-call challenge:

Each day pick 1 alert.
Did anyone act last time it fired?
No? Delete it or quiet it.

Day 7: a pager people trust again.

Who is in?

#SRE #Observability

### Post 2. Topic: Zero console clicks for a week

#### LinkedIn

Try this for 7 days: zero clicks in the cloud console.

Need a bucket? Terraform.
Need an IAM change? Terraform.
Need to check something? Use gcloud or read the state.

Rules:
1. Looking in the console is fine. Changing is not.
2. Every change goes through a PR.
3. Write down each time it felt hard.

At the end, the list of "hard" moments is a gift. Each one is a missing module or a missing doc.

I did this with my team. We found 6 gaps in our blueprint in one week.

#### X

7-day challenge: zero clicks in the cloud console.

Every change = Terraform PR.
Write down every time it felt hard.

That list = the missing modules and docs.

We found 6 gaps in one week.

#Terraform #GCP

---

## 19. Milestone / achievement post

### Post 1. Topic: All payment services on GitOps

#### LinkedIn

A small milestone for our team this month.

All payment services now deploy to Prod through GitOps. No manual steps.

A few months ago:
Some releases needed a person to run commands.
Environments did not always match.
Rollbacks needed a long call.

Today:
Every release is a PR.
Dev, QA and Prod look the same.
Rollback is a git revert.

Not a fancy launch. No big party.
Just a lot of quiet, careful work by a great team.
Proud of this one.

#### X

Small milestone:

Every payment service now goes to prod via GitOps.

Release = PR
Rollback = git revert
Dev, QA, Prod look the same

No party. Just quiet, careful work.

#GitOps #PlatformEngineering

### Post 2. Topic: The GKE book is out

#### LinkedIn

Milestone: our book "Getting Started with Google Kubernetes Engine" is out.

I co-wrote it with Nilanjana Saha.

Why we wrote it:
Many people learn Kubernetes from blogs that skip the boring parts. Networking. IAM. Upgrades. The parts that hurt in production.

So we wrote those parts too.

It took many early mornings and late evenings.
It also made me a better engineer. Explaining something simply shows how much we really know.

Thank you to everyone who helped along the way.

#### X

Milestone: our book "Getting Started with Google Kubernetes Engine" is out.

Co-written with Nilanjana Saha.

We wrote the boring parts too.
IAM. Networking. Upgrades.
The parts that hurt in prod.

#GKE #Kubernetes

---

## 20. Lessons from a book, talk, or event

### Post 1. Topic: The Google SRE book

#### LinkedIn

3 lessons from the Google SRE book that I still use every week.

1. Hope is not a strategy.
If our plan for an outage is "it won't happen", we have no plan.

2. Error budgets end fights.
Devs want speed. Ops want safety. A budget gives both sides one number to agree on.

3. Toil should be cut.
If we do the same manual task again and again, it should become a script.

The book is old now. The lessons are not.

#### X

3 lessons from the Google SRE book I still use:

Hope is not a strategy.
Error budgets end fights.
Toil should be automated.

Old book. Fresh lessons.

#SRE #DevOps

### Post 2. Topic: A Berlin platform meetup

#### LinkedIn

I went to a platform engineering meetup in Berlin. Here is what stuck with me.

1. A platform is a product. Developers are the customers. Ask them what hurts.
2. Golden paths beat rules. Make the right way the easy way.
3. Measure what devs feel: time to first deploy, time waiting on PRs.
4. Docs are part of the platform, not an extra.

One speaker said: "If devs go around our platform, our platform is the problem."

That line stayed with me all the way home.

#### X

From a Berlin platform meetup:

Platform = product.
Golden paths beat rules.
Measure what devs feel.

"If devs go around our platform, our platform is the problem."

#PlatformEngineering #DevOps

---

## 21. Reaction to news or a trending topic

### Post 1. Topic: Another big cloud outage

#### LinkedIn

Another big cloud outage is in the news. Here is what I take from it, every single time.

1. "The cloud" is still someone's data centers.
2. Single region is a choice. Know when it is okay and when it is not.
3. Status pages are slow. Our own monitoring must tell us first.
4. Is there a runbook for "the provider is down"? Most teams do not have one.

It is easy to blame the provider.
The better question is: what did our system do when it happened?

#### X

Every big cloud outage, same lessons:

Cloud = someone's data centers.
Single region is a choice.
Status pages are slow.
Is there a "provider is down" runbook?

Ask what our system did.

#Cloud #SRE

### Post 2. Topic: AI agents in DevOps

#### LinkedIn

Everyone is talking about AI agents running DevOps. Here is my view from the ground.

What AI already does well for me:
Explains old Terraform in seconds.
Drafts GitHub Actions workflows.
Turns a long log into a short summary.

What I will not let it do yet:
Apply Terraform in prod.
Change IAM without a human.
Close an incident on its own.

AI is a great junior helper. Fast, never tired, and sometimes wrong with full confidence.
So we review everything. Just like a junior's PR.

#### X

AI agents in DevOps, my view:

Great at: explaining old Terraform, drafting workflows, summing up logs.

Not allowed yet: prod applies, IAM changes.

Fast helper. Sometimes confidently wrong.
So we review.

#AI #DevOps

---

## 22. Contrarian question ("Why do we still...?")

### Post 1. Topic: Service account keys in 2026

#### LinkedIn

Why do we still create service account keys in 2026?

Workload Identity Federation exists.
GKE Workload Identity exists.
Short-lived tokens exist.

Yet I still find JSON keys in old pipelines, in chat messages, on laptops "for testing".

Every key is a door that never closes on its own.

So, honest question: what is stopping teams from removing them?
Old tools? Time? Fear of breaking things?

I want to understand the real blockers.

#### X

Why do we still create service account keys in 2026?

Workload Identity exists.
Short tokens exist.

Every key is a door that never closes.

What is the real blocker?

#GCP #DevSecOps

### Post 2. Topic: Fear of Friday deploys

#### LinkedIn

Why do we still fear Friday deploys?

If a deploy on Friday is scary, it is also scary on Tuesday. We just hide it better.

Real fixes:
Small changes.
Fast rollback, like a git revert.
Good alerts on what users feel.
The same image already tested in QA.

When those are in place, Friday is just another day.

I am not saying ship big things at 5 PM on Friday. I am saying the fear is a signal, not a rule.

#### X

Why do we still fear Friday deploys?

If Friday is scary, Tuesday is too.

Small changes.
Fast rollback.
Good alerts.

The fear is a signal, not a rule.

#DevOps #SRE

---

## 23. Interview questions and answers

### Post 1. Topic: A pod keeps restarting

#### LinkedIn

Interview question I like to ask platform engineers:

Q: A pod keeps restarting in GKE. Walk me through it.

A good answer sounds like:
1. kubectl describe pod. Look at events and the exit code.
2. Exit code 137? Probably out of memory. Check limits.
3. CrashLoop with an error? Check logs, including the previous container.
4. Probe failing? Maybe the app is slow to start. Check readiness and liveness.
5. Recent deploy? Compare with the last good version.

What I really listen for is calm, step by step thinking. Not a perfect answer.

#### X

Interview Q: A pod keeps restarting. What now?

describe pod
exit 137 = memory?
logs --previous
check probes
what changed?

I listen for calm steps, not a perfect answer.

#Kubernetes #Interview

### Post 2. Topic: Two applies at once

#### LinkedIn

Interview question: "Two people run terraform apply at the same time. What happens?"

Weak answer: "It breaks."

Good answer:
With a remote backend and locking, the second run waits or fails. The state stays safe.
Without locking, both can write state. Now state and real life do not match.

Great answer adds:
"That is why we only apply from Terraform Enterprise or a pipeline, never from laptops."

I love it when people talk about the process, not just the tool.

#### X

Interview Q: Two people run terraform apply at once?

Weak: "It breaks."
Good: "Locking stops the second one."
Great: "So we never apply from laptops. Only from TFE."

#Terraform #Interview

---

## 24. Salary, cost, or numbers reveal

### Post 1. Topic: €290k saved in one year

#### LinkedIn

Numbers reveal: how we saved €290k in cloud costs in one year (at a past company).

Where the money was going:
Idle dev environments running all weekend.
Oversized nodes "just in case".
Old disks and snapshots nobody owned.
Logs kept forever.

What we did:
Scaled down non-prod at night and on weekends.
Right-sized nodes using real usage data.
Put labels on everything, so every cost had an owner.
Set clear log retention rules.

No magic. Just looking at the bill every week, like a family budget.

#### X

How we saved €290k in cloud costs in a year:

Non-prod off at night
Right-sized nodes
Labels = every cost has an owner
Log retention rules

No magic. Weekly bill reviews.

#FinOps #Cloud

### Post 2. Topic: One label, a big bill

#### LinkedIn

A numbers story about one label.

Someone added a user_id label to a metric. Just one label.

Before: a few thousand series.
After: hundreds of thousands.
The observability bill jumped. Queries got slow.

Fix:
Removed the label.
Put user details in logs and traces instead of metrics.
Added a cardinality check to our review list.

Lesson: in metrics, every new label value is a new row we pay for.
Metrics count things. Logs and traces tell stories.

#### X

One label. Big bill.

Someone added user_id to a metric.
Series went from thousands to hundreds of thousands.

Metrics count.
Logs and traces tell stories.

#Observability #Grafana

---

## 25. Thank-you / gratitude post

### Post 1. Topic: QA testers

#### LinkedIn

A thank-you to the QA testers on our team.

They catch what our dashboards miss.
They click the strange buttons. They try the odd card numbers. They ask "what if" all day.

More than once, a QA tester found a problem before any alert did.
That is not luck. That is skill.

Platform work gets the credit for uptime. A big part of it belongs to the people who break things before customers do.

Thank you. We see the work.

#### X

Thank you to our QA testers.

They try the odd inputs.
They ask "what if" all day.
They often find bugs before our alerts do.

Uptime has many hidden heroes.

#QA #DevOps

### Post 2. Topic: My first boss

#### LinkedIn

Thank you to my first boss, back when I was a system admin in 2005.

They gave me one rule: "Write down what we did, even if it worked."

I thought it was boring. 20 years later, it is the most useful habit I have.

Every runbook I write, every PR description, every handover note comes from that one rule.

Sometimes the best gift is one small habit.

#### X

Thank you to my first boss from 2005.

One rule: "Write down what we did, even if it worked."

20 years later, still my best habit.

#Gratitude #DevOps

---

## 26. Hiring or mentoring announcement

### Post 1. Topic: Mentoring slots

#### LinkedIn

I am opening a few more mentoring slots this month.

Who it is for:
Engineers moving into cloud, DevOps or platform roles.
People planning a move to Germany or Europe.
Anyone who wants a CV review from someone who has been hired here more than once.

What we can talk about:
GCP, Terraform, Kubernetes, GitOps, DevSecOps.
How German job interviews work.
How to show real project work on a CV.

The link is on my profile (Topmate). The first 15 minutes are free.

#### X

Opening a few mentoring slots:

Cloud and DevOps careers
Moving to Germany
CV reviews

First 15 min free.
Link in bio.

#Mentoring #DevOps

### Post 2. Topic: Hiring a platform engineer (template)

#### LinkedIn

We are looking for a platform engineer to join us. [Add the job link before posting.]

What the work looks like:
GCP and GKE.
Terraform Enterprise.
Flux GitOps with Kustomize.
GitHub Actions with security built in.
Observability with the PLGT stack and Grafana Cloud.

What matters more than the tool list:
Calm in incidents.
Clear writing.
Kindness in code review.

If someone in our network fits, a tag or a share helps a lot.

#### X

We are hiring a platform engineer.

GCP, GKE, TFE, Flux, GitHub Actions, Grafana.

Even more important:
Calm in incidents.
Clear writing.
Kind reviews.

Link below. Shares help.

#Hiring #PlatformEngineering

---

## 27. Origin story / hero's journey

### Post 1. Topic: From storage admin to platform engineer

#### LinkedIn

In 2008, my job was to keep storage boxes alive in a cold server room in Bangalore.

I knew disks. I knew RAID. I knew nothing about cloud.

Then the work started moving. VMs first. Then cloud. Then containers.
I had two choices: stay the "storage guy" or start again from zero.

I started again.
Nights with VMware labs. Weekends with AWS and Azure. Later GCP and Kubernetes.
Some years felt slow. Some years felt like running uphill.

Today I build GCP platforms for payments in Germany.
Terraform Enterprise, GKE, Flux, GitHub Actions, Grafana.

The storage years were not wasted. They taught me one thing every platform needs: respect for data.

#### X

2008: keeping storage boxes alive in Bangalore.
2026: building GCP platforms for payments in Germany.

In between: many nights of labs and starting from zero more than once.

The storage years taught me respect for data.

#CareerGrowth #Cloud

### Post 2. Topic: How Kubernetes found me

#### LinkedIn

I did not choose Kubernetes. A monolith chose it for me.

Years ago, I joined a project with one big app. One deploy took hours. One bug could stop everything.

The plan: break it into microservices and run them on Kubernetes.
I had read about pods. I had never run one in production.

The first months were hard.
Pods died for reasons I did not understand.
Networking felt like magic. Bad magic.

But step by step, it clicked.
Releases went from every two weeks to every week. The app got faster.

That project became the start of everything I do now.
Sometimes the scary project is the door.

#### X

I did not choose Kubernetes.
A monolith chose it for me.

Pods died. Networking felt like bad magic.

Then releases went from bi-weekly to weekly.

Sometimes the scary project is the door.

#Kubernetes #CareerGrowth

---

## 28. Before → after transformation

### Post 1. Topic: Releases before and after GitOps

#### LinkedIn

Before and after GitOps on a payment platform.

Before:
A release meant a call, a checklist and someone typing commands.
Dev, QA and Prod were "almost" the same.
Rollback meant another call and more typing.
Nobody was sure what was running where.

After:
A release is a PR to an overlay.
Flux applies it. Same image in every environment.
Rollback is a git revert.
Git shows exactly what runs where, and who changed it.

The tech change was a few weeks of work.
The calm it brought is worth every hour.

#### X

Before GitOps:
calls, checklists, typing commands, "almost same" envs.

After:
release = PR
rollback = git revert
Git shows what runs where.

A few weeks of work.
A lot of calm.

#GitOps #DevOps

### Post 2. Topic: Alert noise before and after

#### LinkedIn

Before and after we fixed our alerts.

Before:
Hundreds of alerts a week.
Most of them CPU and memory.
People muted the channel.
Real problems hid in the noise.

After:
Alerts based on SLOs. Error rate and latency.
Every alert has an owner and a runbook link.
Low priority goes to a ticket, not the pager.

Result: alert noise dropped by about 60%. Time to fix went down by about 40%.

The best part? People started reading alerts again.

#### X

Alerts, before:
hundreds a week, mostly CPU, channel muted.

After:
SLO based, an owner each, runbook links.

Noise down ~60%.
Time to fix down ~40%.
People read alerts again.

#SRE #Observability

---

## 29. Underdog / rejection-to-success

### Post 1. Topic: Losing a job in the German winter

#### LinkedIn

I moved to Germany on a Blue Card. A few months later, I lost my job. In the middle of winter.

New country. Little German. Short daylight. A visa clock ticking.

I sent application after application.
Many rejections. Many with no reply at all.

So I made a plan:
German lessons every morning.
One cloud skill deeper every week.
A run every day, just to clear my head.

It took time. Then one yes came. Then better roles.

Today I build platforms for payments here.
That winter is still the strongest teacher I ever had.

#### X

Moved to Germany.
Lost my job mid-winter.
Little German. Visa clock ticking.

Plan:
German every morning.
One skill deeper every week.
A run every day.

One yes came. Then more.

#Germany #CareerGrowth

### Post 2. Topic: "Not a cloud person"

#### LinkedIn

Years ago, someone told me I was "just a storage guy" and cloud was not for me.

It hurt. A little because I was afraid they were right.

So I did not argue. I studied.
VMware first. Then Azure. Then AWS. Then GCP.
One certification at a time. One small project at a time.

Today I hold the Google Cloud Professional Architect cert and design GCP landing zones for payments.

I do not share this to say "look at me".
I share it for anyone told they are "not a cloud person".
That is just an opinion. Not a fact.

#### X

Someone once told me I was "just a storage guy".
Cloud was "not for me".

I did not argue.
I studied.

Today: Google Cloud Architect, building GCP for payments.

"Not a cloud person" is an opinion, not a fact.

#Cloud #CareerGrowth

---

## 30. Vulnerability / confession

### Post 1. Topic: Faking Kubernetes networking

#### LinkedIn

A confession: for about a year, I nodded along when people talked about Kubernetes networking.

Services, kube-proxy, CNI, network policies.
I knew the words. I did not really know how a packet moved.

It worked until it didn't.
One day a service could not reach another, and I had no idea where to start.

So I went back to basics.
Drew it on paper. Pod to Service. Service to endpoints. Endpoints to pod.
Ran tcpdump. Broke things in a test cluster.

Now it is one of my strongest areas.

Pretending to know is tiring. Learning is faster.

#### X

Confession:
for a year I nodded along about Kubernetes networking.

Knew the words.
Not the packets.

Then I drew it on paper and broke a test cluster.

Pretending is tiring. Learning is faster.

#Kubernetes #Learning

### Post 2. Topic: Freezing in a first payment incident

#### LinkedIn

I froze in my first incident on a payment platform.

Years of experience. Still froze.

Error rate going up. Many people joining the call. Someone asked me a simple question and my mind went blank.

What helped:
A teammate said, "Let us look at what changed in the last hour."
That one calm question unlocked everything.

What I do now:
I keep a short incident checklist open.
First question is always "what changed?"
I say "give me two minutes" out loud when I need it.

Being senior does not mean never feeling fear. It means having a plan for it.

#### X

I froze in my first payment incident.
Years of experience. Still froze.

A teammate asked: "What changed in the last hour?"
That unlocked it.

Now I keep a checklist and say "give me 2 minutes".

#SRE #Incidents

---

## 31. Career pivot story

### Post 1. Topic: Storage to cloud

#### LinkedIn

The hardest career move I made was from storage to cloud.

Not because cloud is hard.
Because I had to stop being an expert and be a beginner again.

As a storage engineer, people came to me with questions.
In cloud, I was the one asking. Every day.

What helped:
I connected old skills to new ones. Storage taught me backups, data safety and capacity. All of it still matters in GCP.
I learned in public. I asked "silly" questions.
I took small cloud tasks nobody wanted.

Pivots are not a jump. They are a hundred small steps in a new direction.

#### X

Hardest move: storage to cloud.

Not because cloud is hard.
Because I had to be a beginner again.

Old skills still help: backups, data safety, capacity.

A pivot is 100 small steps, not one jump.

#Cloud #CareerGrowth

### Post 2. Topic: A platform engineer in a coding bootcamp

#### LinkedIn

After 15+ years in infrastructure, I joined a full-stack MERN bootcamp.

People asked why. I had a good platform career.

My reason: I kept building platforms for developers without really feeling their pain.

What I learned:
Waiting 20 minutes for a pipeline kills focus.
Unclear error messages make people go around the platform.
Local setup is often the hardest part of a dev's day.

Now when I build a GitHub Actions workflow or a Flux setup, I think like a developer first.

Best career pivot I made was a small side step, not a full change.

#### X

16 years in infra.
Then I joined a MERN coding bootcamp.

Why? To feel what developers feel.

Slow pipelines kill focus.
Unclear errors push people around the platform.

Now I build with a dev's eyes.

#PlatformEngineering #DevEx

---

## 32. Layoff / job-hunt journey

### Post 1. Topic: The job hunt, week by week

#### LinkedIn

My job hunt in Germany, week by week.

Week 1: Shock. Updated the CV. Told myself it would be quick.
Week 3: Many applications. Few replies.
Week 5: Changed the CV. Fewer buzzwords, more results with numbers.
Week 7: First interviews. Failed one on a system design question I knew but explained badly.
Week 9: Practised out loud. Drew diagrams. Did mock interviews with friends.
Week 11: Two final rounds.
Week 12: An offer.

What I learned: a job hunt is a project. Track it. Improve it each week. Don't take silence personally.

#### X

My job hunt, short version:

Wk 1: shock
Wk 3: no replies
Wk 5: fixed CV, added numbers
Wk 7: failed an interview
Wk 9: practised out loud
Wk 12: offer

A job hunt is a project. Improve it weekly.

#JobSearch #DevOps

### Post 2. Topic: What actually got replies

#### LinkedIn

What changed my job hunt from silence to replies.

1. I cut my CV from 4 pages to 2.
2. Each line had a result: "cut cloud costs by €290k", not "worked on cloud costs".
3. I matched words to the job ad. If they said GKE, I said GKE, not just Kubernetes.
4. I asked old colleagues for referrals. Most of my interviews came this way.
5. I posted about my work on LinkedIn. Recruiters started coming to me.

Silence does not mean "not good enough".
Often it means "not clear enough".

#### X

What turned my job hunt from silence to replies:

CV cut to 2 pages
A result in every line
Job ad keywords
Referrals
Posting real work

Silence often means "not clear enough", not "not good enough".

#JobSearch #CareerGrowth

---

## 33. Burnout / mental health / life-meets-work story

### Post 1. Topic: Running started as a way to cope

#### LinkedIn

My running streak started on a bad day.

No job, cold weather, too many worries. I put on old shoes and ran for 10 minutes. Slowly.

The next day I did it again.
Then again.

Today the streak is more than 1,371 days.

It never made the problems go away.
It made me strong enough to face them.

The same thing works in engineering.
Small, daily, boring work beats rare heroic nights.
One Terraform module a day. One runbook a week. One alert cleaned up.

Consistency beats intensity. On the road and in the cluster.

#### X

My running streak started on a bad day.
No job. Cold. Too many worries.

10 slow minutes.
Then again the next day.

1,371+ days later:
small daily work beats heroic nights.
On the road and in the cluster.

#Running #MentalHealth

### Post 2. Topic: On-call burnout

#### LinkedIn

I once burned out from on-call, and I did not see it coming.

The signs I missed:
I checked my phone in the shower.
I could not sleep after a quiet night, waiting for the pager.
I got angry at small Slack messages.

What helped:
Talking to my manager honestly.
Fewer, better alerts.
Real handovers, with notes.
Breathwork for 10 minutes before bed.

On-call should be a shared load, not a personal weight.
If one person carries it alone, the system is broken, not the person.

#### X

I burned out from on-call.

Signs I missed:
phone in the shower,
no sleep on quiet nights,
anger at small messages.

What helped: honest talk, fewer alerts, real handovers, breathwork.

#SRE #MentalHealth

---

## 34. "What X taught me about Y"

### Post 1. Topic: What running taught me about SLOs

#### LinkedIn

What running taught me about SLOs.

1. I do not run at max speed every day. Services should not run at 100% either.
2. A small pain ignored becomes an injury. A small error rate ignored becomes an outage.
3. I track pace over weeks, not one run. SLOs are about the trend, not one bad minute.
4. Rest days are part of training. Error budgets are part of reliability.

My watch shows me the truth every morning.
Grafana does the same for our payment services.

Both only help if I actually look.

#### X

What running taught me about SLOs:

Don't run at 100% every day.
Small pain ignored = injury.
Watch the trend, not one bad run.
Rest days = error budget.

#SRE #Running

### Post 2. Topic: What learning German taught me about docs

#### LinkedIn

What learning German taught me about writing docs.

When my German was weak, long sentences scared me.
Short sentences and simple words helped me understand.

Then I looked at our runbooks.
Long. Clever. Full of words only experts know.

So I rewrote them like I was writing for my German-learning self:
Short lines.
One step per line.
The real command, ready to copy.
No "simply" or "obviously".

The new runbooks get used. The old ones never did.

Write for a tired person at 3 AM in their second language.

#### X

Learning German taught me how to write docs.

Short lines.
One step per line.
Real commands.
No "simply".

Write for a tired person at 3 AM in their second language.

#Documentation #DevOps

---

## 35. Micro-story with a twist ending

### Post 1. Topic: The midnight payment spike

#### LinkedIn

11:52 PM.
Payment errors in QA jump to 30%.

The on-call engineer wakes up.
Checks Flux. No new deploys.
Checks Cloud Armor. Nothing blocked.
Checks the database. Healthy.
Checks Tempo. One service is slow.

Opens the logs.

It is a load test.
Scheduled by our own team.
Three months ago.
And forgotten.

We now have a calendar for load tests. And a rule: every cron job gets an owner's name.

#### X

11:52 PM.
QA payment errors jump to 30%.

No deploys.
No attacks.
DB healthy.

It was a load test.
Scheduled by us.
3 months ago.
Forgotten.

Every cron job now has an owner.

#SRE #Observability

### Post 2. Topic: Who had owner access

#### LinkedIn

A junior engineer asked me for Owner access on a GCP project.

I said no. I explained least privilege. I was proud of my little speech.

Then I ran an IAM audit to show them how clean our access was.

The first account with Owner on that project?
Mine.
Added "just for a quick fix" months ago.

I removed it the same day and told the team.

Least privilege is easy to preach. It is harder to practise.

#### X

A junior asked me for Owner on a GCP project.
I said no and gave a speech on least privilege.

Then I ran an IAM audit.

First Owner account?
Mine.
From a "quick fix" months ago.

Practise what we preach.

#GCP #DevSecOps

---

## 36. Fictional parable / fable

### Post 1. Topic: Two gardeners and drift

#### LinkedIn

There were two gardeners.

The first one had a plan on paper. Every plant, every row.
When a plant grew wrong, they fixed the plant and the paper.

The second one just worked from memory.
Moved a plant here. Cut a branch there. Never wrote it down.

One summer, both got sick for a month.
Helpers came to take over.

The first garden kept growing. The helpers just followed the paper.
The second garden fell apart. Nobody knew what was where or why.

Terraform is the paper.
The console is the memory.

#### X

Two gardeners.

One kept a plan on paper.
One worked from memory.

Both got sick. Helpers took over.

Paper garden: fine.
Memory garden: chaos.

Terraform is the paper.

#Terraform #IaC

### Post 2. Topic: The village with one well

#### LinkedIn

A village had one well. It was a very good well.

Everyone used it. Nobody built another one. "Why? It never fails."

One dry summer, the well cracked.
No water for a week.

The next village had three small wells. Not as good. But when one cracked, the others worked.

In system design, we call the first village a single point of failure.

One zone. One database. One person who knows the setup.
Each one is a very good well. Until it is not.

#### X

A village had one great well.
Nobody built another.

One summer it cracked.
No water for a week.

One zone.
One database.
One person who knows it all.

Each is a great well. Until it cracks.

#SystemDesign #SRE

---

## 37. "If I started over today"

### Post 1. Topic: Learning DevOps from zero in 2026

#### LinkedIn

If I had to learn DevOps from zero in 2026, I would do this.

Month 1: Linux, Git and networking basics.
Month 2: One cloud. I would pick GCP. Build a small app on it.
Month 3: Docker, then GKE. Deploy that app.
Month 4: Terraform. Rebuild everything from month 2 as code.
Month 5: GitHub Actions with tests and a Trivy scan.
Month 6: Flux for GitOps. Grafana for monitoring.

And from day one: use AI to explain things, but type the code by hand at first.

One project, built again and again with better tools. That beats 20 courses.

#### X

Learning DevOps from zero in 2026:

M1 Linux, Git, networking
M2 GCP
M3 Docker, GKE
M4 Terraform
M5 GitHub Actions + Trivy
M6 Flux + Grafana

One project, rebuilt again and again.

#DevOps #Learning

### Post 2. Topic: Building a platform again from day one

#### LinkedIn

If I built our GCP platform again from day one, I would change the order.

What I would do first:
1. IAM and identity. Workload Identity everywhere. No keys, ever.
2. Observability. Grafana before the first service, not after the first outage.
3. Naming and labels. They are impossible to fix later.
4. The Terraform Enterprise blueprint and module versioning.

What I would do later:
Fancy dashboards.
Service mesh.
Auto-scaling tweaks.

Foundations feel slow. Fixing foundations later is much slower.

#### X

Building a GCP platform again, I'd start with:

IAM + Workload Identity
Observability
Naming + labels
TFE blueprint

Fancy dashboards later.

Foundations feel slow.
Fixing them later is slower.

#GCP #PlatformEngineering

---

## 38. Letter to my younger self

### Post 1. Topic: To the 2005 sysadmin

#### LinkedIn

Dear 2005 me,

That server room is loud and cold. Stay curious anyway.

Some things to know:
The tools will change many times. Storage, VMs, cloud, containers, AI. Learning how to learn matters more than any one tool.
Write things down. Future me will thank us.
Ask for help sooner. Struggling alone is not brave. It is slow.
Take care of the body. Running will save us one day.
Germany is in our future. Start German earlier. Much earlier.

It works out. Not in a straight line. But it works out.

2026 me

#### X

Dear 2005 me,

Tools will change many times.
Learn how to learn.
Write things down.
Ask for help sooner.
Start German earlier. Much earlier.

It works out.
Not in a straight line.

#CareerGrowth #DevOps

### Post 2. Topic: To myself on day one in Germany

#### LinkedIn

Dear me, on the first day in Germany,

The cold is not the hard part. The quiet is.

Things to know:
People are direct. It is not rude. It is clear.
Meetings start on time. Be early.
Documentation is respected here. Good, that is a strength.
A job loss will come. It will not be the end.
Running in the forest will become the best part of the day.

Be patient with the language. And with ourselves.

Later me

#### X

Dear me, day 1 in Germany:

Direct is not rude.
Be early.
Docs are respected.
A job loss will come. Not the end.
The forest runs will save us.

Be patient.

#Germany #CareerGrowth

---

## 39. Unpopular opinion / hot take

### Post 1. Topic: Most teams don't need a service mesh

#### LinkedIn

Unpopular opinion: most teams do not need a service mesh.

I have run Istio in production. It is powerful.
It is also another big system to upgrade, debug and explain.

Before adding a mesh, check:
Can network policies cover the security need?
Can the app libraries or OpenTelemetry give us the traces?
Can the load balancer handle the traffic rules?

If yes, skip the mesh for now.

Add complexity when the pain is real, not when the conference talk is exciting.

#### X

Unpopular opinion:
most teams don't need a service mesh.

Network policies, OpenTelemetry and a good load balancer cover a lot.

Add complexity when the pain is real.
Not when the talk is exciting.

#Kubernetes #PlatformEngineering

### Post 2. Topic: Kustomize over Helm for our own apps

#### LinkedIn

Hot take: for our own apps, Kustomize is often better than Helm.

Helm is great for sharing software with the world. Many knobs, many values.

But for in-house services, Helm templates can turn into a puzzle.
if inside if inside range. Hard to read. Hard to review.

With Kustomize:
Plain YAML in base.
Small patches in Dev, QA and Prod overlays.
What we see is what gets applied.

We use Helm for third-party tools and Kustomize for our own payment services. Flux handles both.

#### X

Hot take:
for in-house apps, Kustomize beats Helm.

Plain YAML base.
Small overlays per env.
What we read is what gets applied.

Helm for third-party.
Kustomize for ours.
Flux runs both.

#Kubernetes #GitOps

---

## 40. Myth vs fact / myth-busting

### Post 1. Topic: DevSecOps myths

#### LinkedIn

DevSecOps myths I hear a lot.

Myth: Security slows down releases.
Fact: Fixing a CVE in a PR takes minutes. Fixing it in prod takes days.

Myth: The security team owns security.
Fact: Whoever writes the code and the pipeline owns it too.

Myth: A clean scan means we are safe.
Fact: A scan only knows known problems. IAM and network design matter just as much.

Myth: CIS benchmarks are just paperwork.
Fact: They catch real gaps, like open firewall rules and old node images.

Security is a habit, not a gate.

#### X

DevSecOps myths:

"Security slows releases."
A CVE fixed in a PR takes minutes.

"Security team owns it."
Whoever writes the pipeline owns it too.

"Clean scan = safe."
Scans miss bad IAM.

#DevSecOps #Security

### Post 2. Topic: GitOps myths

#### LinkedIn

GitOps myths, busted.

Myth: GitOps means no one can fix prod fast.
Fact: A git revert is often the fastest fix there is.

Myth: GitOps is just CI/CD with a new name.
Fact: CI pushes. GitOps pulls. The cluster keeps fixing itself to match Git.

Myth: Secrets cannot work with GitOps.
Fact: Keep secrets in Secret Manager and only refer to them from Git.

Myth: One repo must hold everything.
Fact: Split by team or by environment. Flux handles many sources.

#### X

GitOps myths:

"No fast fixes."
git revert is a fast fix.

"Just CI/CD renamed."
CI pushes. GitOps pulls.

"No secrets possible."
Keep them in Secret Manager. Refer from Git.

#GitOps #Kubernetes

---

## 41. Expectation vs reality

### Post 1. Topic: Senior engineer life

#### LinkedIn

What I thought senior engineers did vs what we actually do.

Expectation: Write hard code all day.
Reality: Review other people's code and ask "why?" a lot.

Expectation: Know every answer.
Reality: Know where to look and who to ask.

Expectation: Build big new systems.
Reality: Make old systems a bit safer every week.

Expectation: Be the hero in incidents.
Reality: Make sure incidents do not need heroes.

Expectation: Talk only about tech.
Reality: Write a lot of docs and explain things to people who are not engineers.

#### X

Senior engineer,
expectation vs reality:

Write hard code all day.
Review and ask "why?"

Know every answer.
Know where to look.

Be the incident hero.
Make heroes unnecessary.

#CareerGrowth #DevOps

### Post 2. Topic: Terraform Enterprise in real life

#### LinkedIn

Terraform Enterprise: expectation vs reality.

Expectation: Install it and everything becomes clean.
Reality: TFE runs plans well. It does not design the workspaces for us.

Expectation: Policies will catch every mistake.
Reality: Policies catch what we wrote rules for. Nothing more.

Expectation: Teams will reuse modules.
Reality: Only if the modules are versioned, documented and easier than copy and paste.

Expectation: Drift goes away.
Reality: Drift shows up. Then someone still has to fix it.

TFE is a great tool. The design around it is still our job.

#### X

Terraform Enterprise:

Expect: everything clean.
Reality: still need good workspace design.

Expect: policies catch all.
Reality: only what we wrote rules for.

Great tool. The design is still our job.

#Terraform #PlatformEngineering

---

## 42. Steelman / both sides

### Post 1. Topic: Monorepo vs many repos for Terraform

#### LinkedIn

Monorepo vs many repos for Terraform. Let me argue both sides fairly.

For one big repo:
One place to search.
Easy changes across many stacks.
Shared CI and rules.

For many repos:
Clear ownership per team.
Smaller blast radius.
Faster plans, less noise in PRs.

Where I land:
Modules in their own versioned repos.
Environment and stack config in a small number of repos, mapped to TFE workspaces.

Both sides have a point. The worst choice is not picking one and drifting into both.

#### X

Terraform: monorepo or many repos?

Mono: one search, shared rules.
Many: clear owners, smaller blast radius.

Me: modules versioned alone, env configs grouped.

Worst choice? Drifting into both.

#Terraform #IaC

### Post 2. Topic: Auto-apply to prod

#### LinkedIn

Should Terraform auto-apply to prod after merge? Both sides.

Yes, because:
The PR review is the real approval.
Manual steps get skipped or rushed anyway.
Faster feedback, less drift.

No, because:
A plan can change between review and apply.
Some changes need a time window, like during low traffic.
A destroy in prod deserves one more pair of eyes.

What we do:
Auto-apply in Dev and QA.
In Prod, apply after a quick look at the final plan in TFE, with policy checks blocking risky changes.

#### X

Auto-apply Terraform to prod?

Yes: PR review is the approval.
No: plans can change after review.

Us:
Auto in Dev and QA.
Prod: one last look at the plan, policies block risky stuff.

#Terraform #DevOps

---

## 43. Rant / pet peeve post

### Post 1. Topic: "Temporary" firewall rules

#### LinkedIn

Small rant about the word "temporary".

"Temporary firewall rule for testing."
"Temporary Owner role for the migration."
"Temporary public bucket to share one file."

I have found all three, alive and well, more than a year later.

Nothing in the cloud is temporary unless something deletes it.

So now:
Every "temporary" thing in Terraform gets an expiry label and a ticket.
A weekly job lists anything past its date.
No ticket, no merge.

Okay. Rant over. Going to check our firewall rules now.

#### X

Small rant.

"Temporary firewall rule."
"Temporary Owner role."
"Temporary public bucket."

All found alive a year later.

Nothing in the cloud is temporary unless something deletes it.

#GCP #DevSecOps

### Post 2. Topic: README files that say TODO

#### LinkedIn

Pet peeve: a README that says only "TODO".

I open a repo during an incident. I need to know:
What does this service do?
Who owns it?
How do I deploy it?
Where are the dashboards?

The README says: "TODO: add docs".
Last change: three years ago.

A README does not need to be long. Five lines are enough:
1. What it does.
2. Owner team.
3. How it deploys.
4. Link to Grafana.
5. Link to runbook.

Five lines. Write them today.

#### X

Pet peeve:
a README that says "TODO".

5 lines is enough:
what it does
owner
how it deploys
Grafana link
runbook link

Write them today.

#Documentation #DevOps

---

## 44. Personal manifesto / "Things I believe"

### Post 1. Topic: 10 things I believe about platforms

#### LinkedIn

10 things I believe about platforms.

1. A platform is a product. Developers are the users.
2. The right way should be the easy way.
3. If it is not in Git, it does not exist.
4. Security belongs in the pipeline, not in a meeting at the end.
5. Every alert needs an owner and a next step.
6. Same image in every environment.
7. Docs are part of the feature.
8. Fewer tools, used well.
9. Boring is a compliment.
10. Systems should survive failure. I have seen too many that didn't.

#### X

What I believe about platforms:

Platform = product.
Right way = easy way.
Not in Git = not real.
Security in the pipeline.
Every alert has an owner.
Boring is a compliment.

#PlatformEngineering #DevOps

### Post 2. Topic: What I believe about on-call

#### LinkedIn

What I believe about on-call.

1. If it pages a human, it must need a human.
2. Every page should have a runbook.
3. Nobody should be on call alone for too long.
4. Sleep matters. Bad nights must lead to fixes, not to pride.
5. Incidents are learning time, not blame time.
6. On-call pain is data. Use it to decide what to fix next.
7. The goal of on-call is to make on-call boring.

Good on-call is a sign of a healthy team, not just a healthy system.

#### X

What I believe about on-call:

If it pages a human, it needs a human.
Every page has a runbook.
Sleep matters.
Learn, don't blame.
The goal is boring on-call.

#SRE #OnCall

---

## 45. Inverse advice

### Post 1. Topic: How to make a GKE cluster fail

#### LinkedIn

How to guarantee our GKE cluster fails. A simple guide.

1. Skip resource requests and limits. Let pods fight.
2. Run one replica of everything. Who needs two?
3. No PodDisruptionBudgets. Upgrades will be exciting.
4. Use the latest tag for images. Surprise is fun.
5. Give every workload the default service account with wide rights.
6. Never test node upgrades in QA first.
7. Turn off alerts because they are noisy.

Follow all seven and the cluster will fail. Usually on a Friday.

Or do the opposite of each one.

#### X

How to make a GKE cluster fail:

No resource limits
1 replica of everything
No PDBs
latest tags
Default service account everywhere
Skip QA for upgrades

Or do the opposite.

#Kubernetes #GKE

### Post 2. Topic: How to make sure nobody uses the platform

#### LinkedIn

How to make sure nobody uses our internal platform.

1. Never ask developers what they need.
2. Write error messages only we understand.
3. Make the docs a wiki page from 2021.
4. Change things without telling anyone.
5. Make every request a ticket that takes a week.
6. Add rules without a reason or a fix guide.

Do this, and teams will build their own shadow platform within months.

Every point here is something I have seen. Some I did myself.

#### X

How to make sure nobody uses our platform:

Never ask devs what they need.
Cryptic errors.
Docs from 2021.
Silent changes.
1-week tickets.

Then watch shadow platforms grow.

#PlatformEngineering #DevEx

---

## 46. Hypothetical / "What if" scenario

### Post 1. Topic: What if Artifact Registry is down during a release

#### LinkedIn

What if Artifact Registry goes down in the middle of a release?

Let us think it through.

New pods cannot pull images. They get stuck.
Old pods keep running, if we did not kill them first.
Rolling updates pause. That is actually good.
Autoscaling cannot add new pods. That is bad on a busy day.

What helps:
Rolling updates with maxUnavailable at 0.
Image pull policy that uses the cached image when the tag is fixed.
An alert on image pull errors.
A rule: no big releases on peak shopping days.

Thinking about "what if" is cheaper than finding out live.

#### X

What if Artifact Registry is down mid-release?

New pods can't pull.
Old pods keep running.
Autoscaling can't add pods.

Help: maxUnavailable 0, fixed tags, alerts on pull errors.

"What if" is cheaper than live.

#GKE #SRE

### Post 2. Topic: What if the Terraform state disappears

#### LinkedIn

What if our Terraform state file disappeared tomorrow?

The resources would still be there. GKE, buckets, IAM. All running.
But Terraform would think nothing exists.
The next apply would try to create everything again.

How we protect against it:
State lives in Terraform Enterprise, with versions.
Nobody edits state by hand without a second person.
We know how to use terraform import and import blocks.
We have practised a restore once, in a test workspace.

A backup we have never restored is just a hope.

#### X

What if our Terraform state vanished?

Resources still run.
Terraform thinks nothing exists.
Next apply tries to create it all again.

We keep versioned state in TFE and practise restores.

An untested backup is a hope.

#Terraform #IaC

---

## 47. "Things nobody tells us about X"

### Post 1. Topic: GKE upgrades

#### LinkedIn

Things nobody tells us about GKE upgrades.

1. The control plane upgrade is the easy part. Node pools are where the surprises are.
2. Pods without a PodDisruptionBudget can all go down at once.
3. Old API versions break quietly. Check deprecations before the upgrade, not after.
4. Surge upgrades need spare quota. No quota, no upgrade.
5. Maintenance windows matter. Auto-upgrade on a busy shopping day is a bad idea.
6. QA first. Always. Even for a "small" patch.

GKE makes upgrades easy. It does not make them free of risk.

#### X

Nobody tells us this about GKE upgrades:

Node pools hide the surprises.
No PDB = all pods down at once.
Old APIs break quietly.
Surge needs quota.
QA first. Always.

#GKE #Kubernetes

### Post 2. Topic: Becoming senior

#### LinkedIn

Things nobody tells us about becoming a senior engineer.

1. Less coding. More reading other people's code.
2. More "no" and "not now". Saying it kindly is a skill.
3. People copy what we do, not what we say. Sloppy PRs spread fast.
4. Writing becomes a main tool. Design docs, PR notes, incident reviews.
5. Our success is the team's success. Solo wins matter less.
6. The imposter feeling does not go away. It just gets quieter.

Nobody gives a manual. So here is a short one.

#### X

Nobody tells us this about going senior:

Less coding, more reading.
Saying "no" kindly.
People copy what we do.
Writing is a main tool.
Imposter feeling stays. Just quieter.

#CareerGrowth #DevOps

---

## 48. Framework / mental model post

### Post 1. Topic: The SAFE release model

#### LinkedIn

A simple model I use for every release. I call it SAFE.

S = Small. One change at a time. Easy to understand, easy to undo.
A = Automated. No hand-typed commands. A pipeline and Flux do the work.
F = Fast rollback. A git revert should fix it in minutes.
E = Easy to see. Dashboards and alerts that show the impact right away.

If a release is missing one letter, it is not ready.

Big, manual, slow to undo and invisible? That is how outages are born.

#### X

My release model: SAFE

Small
Automated
Fast rollback
Easy to see

Missing one letter?
Not ready.

#DevOps #SRE

### Post 2. Topic: Blast radius thinking

#### LinkedIn

The one mental model I use for almost every design choice: blast radius.

Before any change, I ask: "If this goes wrong, how much breaks?"

One pod? Fine.
One service? Okay, with a rollback ready.
One environment? Needs a plan.
All environments? Stop. Redesign.

This is why we have:
Separate GCP projects for Dev, QA and Prod.
One TFE workspace per stack.
Small Kustomize overlays, not one big file.
Per-environment service accounts.

Small boxes. Small explosions.

#### X

One question before every change:
"If this goes wrong, how much breaks?"

1 pod: fine
1 service: rollback ready
1 env: plan it
All envs: redesign

Small boxes. Small explosions.

#SystemDesign #PlatformEngineering

---

## 49. Checklist / cheat sheet

### Post 1. Topic: Terraform PR checklist

#### LinkedIn

My Terraform PR checklist. Copy it.

1. Did the plan run in TFE? Read every line.
2. Any destroy or replace? Why?
3. Any IAM change? Is it the smallest role that works?
4. Any firewall or public access change?
5. Are labels set? Owner, environment, cost center.
6. Is the module version pinned?
7. Does the PR say what and why in plain words?
8. Is there a rollback plan?

Eight questions. Two minutes. Saves hours.

#### X

Terraform PR checklist:

Read the full plan
Any destroy?
IAM smallest role?
Public access?
Labels set?
Module pinned?
Clear "why"?
Rollback plan?

2 minutes. Saves hours.

#Terraform #DevOps

### Post 2. Topic: Production readiness on GKE

#### LinkedIn

Production readiness cheat sheet for a new service on GKE.

Runs right:
Resource requests and limits set.
2 or more replicas.
PodDisruptionBudget.
Readiness and liveness probes.

Safe:
Own service account with Workload Identity.
Non-root container.
Image scanned, no critical CVEs.
Network policy in place.

Seen:
Metrics in Prometheus.
Logs in Loki.
Traces in Tempo.
SLO and alert defined.

Owned:
Owner team named.
Runbook linked.

If a box is empty, it is not ready.

#### X

GKE prod readiness:

Limits, 2+ replicas, PDB, probes
Own SA, non-root, scanned image
Metrics, logs, traces, SLO
Owner + runbook

Empty box = not ready.

#GKE #SRE

---

## 50. ELI5 / jargon explained

### Post 1. Topic: Workload Identity Federation for a 10-year-old

#### LinkedIn

Workload Identity Federation, explained like we are 10.

Imagine a school trip to a museum.

Old way: the school gives each kid a real key to the museum. Kids lose keys. Anyone who finds one can walk in, forever.

New way: the teacher calls the museum. "This is my class, today only." The museum gives each kid a sticker that works for one day.

GitHub Actions is the teacher.
GCP is the museum.
The sticker is a short token.

No keys to lose. Stickers stop working by tonight.

#### X

Workload Identity Federation for a 10-year-old:

Old way: every kid gets a museum key forever.
New way: the teacher calls ahead and kids get a 1-day sticker.

GitHub = teacher
GCP = museum

#GCP #DevSecOps

### Post 2. Topic: Error budgets as pocket money

#### LinkedIn

Error budget, explained like pocket money.

Mom gives a kid 10 euros of pocket money for the month.
The kid can spend it on sweets. That is fine.
But when it is gone, no more sweets until next month.

Our SLO says 99.9% of payments should work.
That leaves 0.1% that can fail. That is our pocket money.

Spend it on fast releases and experiments. That is fine.
When it is gone, we stop risky releases and fix reliability first.

Simple rule. Fewer arguments.

#### X

Error budget = pocket money.

SLO 99.9% means 0.1% can fail.
That is the pocket money.

Spend it on fast releases.
Gone? No more sweets.
Fix reliability first.

#SRE #Observability

---

## 51. History / origin of a technology

### Post 1. Topic: Why it is called a bug

#### LinkedIn

Why do we call a software problem a "bug"?

In 1947, engineers working on the Harvard Mark II computer found a real moth stuck in a relay.
They taped it into their logbook with a note: "First actual case of bug being found."

The funny part: engineers already used the word "bug" for problems before that. Edison used it in the 1800s. The moth just made it famous.

Grace Hopper loved telling this story, and it spread.

Today our bugs are in YAML and Terraform, not relays.
Still, it is nice to know the first one had wings.

#### X

Why "bug"?

1947: a real moth found in the Harvard Mark II.
Taped in the logbook: "First actual case of bug being found."

The word was older. The moth made it famous.

Today our bugs live in YAML.

#TechHistory #DevOps

### Post 2. Topic: Why Kubernetes and k8s

#### LinkedIn

Why is it called Kubernetes? And why k8s?

Kubernetes comes from a Greek word for helmsman or pilot. The person who steers the ship.
That is why the logo is a ship's wheel. And why so many tools have sea names: Helm, Harbor, and more.

k8s is just a short way to write it.
K, then 8 letters, then s.

The same trick gives us i18n for internationalization.

Small fact. But it helps when explaining Kubernetes to new people.
We are not running servers. We are steering a ship.

#### X

Why "Kubernetes"?

Greek for helmsman. The one who steers the ship.
Hence the wheel logo and tools like Helm.

k8s = k + 8 letters + s.

We don't run servers.
We steer a ship.

#Kubernetes #TechHistory

---

## 52. Decision-tree / flowchart post

### Post 1. Topic: Should this be an alert?

#### LinkedIn

Should this be an alert? My flowchart in text.

Does a user feel it?
No: make it a dashboard panel, not an alert.
Yes: go on.

Does it need action now?
No: make it a ticket.
Yes: go on.

Can a human fix it?
No: automate the fix.
Yes: go on.

Is there a runbook?
No: write one first.
Yes: page the on-call owner.

Four questions. Most alerts never reach the end. That is the point.

#### X

Should this be an alert?

User feels it? No: dashboard.
Needs action now? No: ticket.
Human can fix it? No: automate.
Runbook exists? No: write it.

All yes? Page.

#SRE #Observability

### Post 2. Topic: Where does this config live?

#### LinkedIn

Where should this config live? Our simple decision tree.

Is it cloud infra? Projects, networks, IAM, GKE clusters, buckets.
Yes: Terraform, run by TFE.

Is it something running inside the cluster? Deployments, services, config maps.
Yes: Git, applied by Flux with Kustomize.

Is it a secret?
Yes: Secret Manager. Git only holds a reference.

Is it different per environment?
Yes: an overlay or a TFE variable. Never a copy of the whole file.

Is it none of these?
Ask in the team chat before inventing a new place.

#### X

Where does config live?

Cloud infra: Terraform via TFE
Inside the cluster: Git + Flux
Secrets: Secret Manager
Per env: overlay or TFE variable

Not sure? Ask before inventing a new place.

#GitOps #Terraform

---

## 53. Hidden gem / underrated feature

### Post 1. Topic: flux diff

#### LinkedIn

An underrated Flux command: flux diff kustomization.

flux diff kustomization payments --path ./apps/payments/overlays/qa

It shows what would change in the cluster if this folder were applied. Before we merge.

Why I love it:
It catches bad patches before Flux does.
It shows real differences, not just the Git diff.
It fits nicely into a PR check.

Most teams only look at Flux after something breaks.
This lets us look before.

#### X

Underrated Flux command:

flux diff kustomization <name> --path <folder>

Shows what the cluster would change before we merge.

Look before it breaks, not after.

#Flux #GitOps

### Post 2. Topic: Service account impersonation

#### LinkedIn

A GCP feature many people skip: service account impersonation.

gcloud config set auth/impersonate_service_account deployer@my-project.iam.gserviceaccount.com

What it does:
I log in as myself.
GCP lets me act as the service account for a short time.
Every action is logged under my name too.

Why it matters:
No key files on laptops.
Clear audit trail.
Easy to remove: just take away the token creator role.

Same idea works in Terraform with the impersonate_service_account setting in the provider.

#### X

GCP hidden gem:
service account impersonation.

Log in as me.
Act as the SA for a short time.
Logged under my name.

No key files on laptops.

#GCP #DevSecOps

---

## 54. "What they say vs what they mean" translation

### Post 1. Topic: Engineering phrases decoded

#### LinkedIn

Engineering phrases, translated.

"Quick sync?" = A 45-minute meeting.
"It works on my machine." = It has never been tested anywhere else.
"Small change." = Nobody read the full Terraform plan.
"Temporary fix." = Permanent fix.
"We will document it later." = We will not.
"Let us take this offline." = Nobody will ever talk about this again.
"The pipeline is flaky." = There is a real bug we have not found yet.

Funny, but each one hides a real lesson.

#### X

Engineering phrases, translated:

"Quick sync?" = 45 min
"Small change" = nobody read the plan
"Temporary fix" = permanent
"Document later" = never
"Flaky pipeline" = real bug, not found yet

#DevOps #Humor

### Post 2. Topic: Incident chat decoded

#### LinkedIn

Incident chat, translated.

"Looking into it." = I just opened Grafana.
"Seems stable now." = Please let it be stable.
"Could be network." = No idea yet.
"Rolled back." = We are breathing again.
"Root cause found." = We found one cause. There may be more.
"Will add an action item." = It goes in the postmortem doc.

The last one matters most.
An action item without an owner and a date is just a wish.

#### X

Incident chat, translated:

"Looking into it." = Grafana is open.
"Seems stable." = Please be stable.
"Could be network." = No idea yet.
"Action item added." = A wish, unless it has an owner and a date.

#SRE #Incidents

---

## 55. Unwritten rules

### Post 1. Topic: Code review

#### LinkedIn

Unwritten rules of code review on a platform team.

1. Review the plan output, not only the code.
2. Ask questions instead of giving orders. "What happens if...?"
3. Small PRs get fast reviews. Huge PRs get a polite "looks good".
4. Nits are fine. Mark them as nits.
5. Never approve IAM or firewall changes without reading them twice.
6. If a PR fixes an incident, still review it. Rushed fixes cause the next incident.
7. Say thank you. Reviews are work too.

#### X

Unwritten rules of code review:

Read the plan, not just the code.
Ask, don't order.
Small PRs, real reviews.
Mark nits as nits.
IAM changes: read twice.
Say thank you.

#CodeReview #DevOps

### Post 2. Topic: Incident calls

#### LinkedIn

Unwritten rules of incident calls.

1. One person leads. Everyone else helps.
2. Say what we are doing before we do it. "I am restarting the pod in QA."
3. No blame on the call. Learning comes later.
4. Write the timeline as it happens. Memory lies.
5. Stop fixing when it is stable. Improve later.
6. Thank the people who joined at 2 AM.

Calm is a skill. These rules make it easier.

#### X

Unwritten rules of incident calls:

One leader.
Say it before doing it.
No blame.
Write the timeline live.
Stable? Stop fixing.
Thank the 2 AM crew.

#SRE #Incidents

---

## 56. Red flags / green flags

### Post 1. Topic: Red flags in a platform job

#### LinkedIn

Red flags in a platform or DevOps job interview.

"We have no on-call. Things just work." Nothing just works.
"We deploy on Fridays at midnight to be safe." Fear-driven release process.
"Security reviews happen before each yearly audit." Security is a calendar event.
"Our last three platform engineers left this year." Ask why.
"Everyone has Owner on prod. We trust each other." Trust is not an IAM model.
"Docs? The code is the docs." Good luck on day one.

Interviews go both ways. Ask these questions.

#### X

Red flags in a DevOps interview:

"No on-call, things just work."
"Everyone has Owner on prod."
"Code is the docs."
"Our last 3 platform engineers left."

Interviews go both ways.

#DevOps #JobSearch

### Post 2. Topic: Green flags in a platform team

#### LinkedIn

Green flags in a platform team.

They can show the last postmortem, and it has no blame.
New people deploy something on day one or two.
Every alert has an owner.
Terraform plans are read, not just applied.
The team says "we do not know yet" without fear.
Docs are updated in the same PR as the code.
On-call is shared and paid fairly.

When I see these, I know the team is healthy. Tools matter less than this list.

#### X

Green flags in a platform team:

Blameless postmortems
Deploy on day 1 or 2
Every alert has an owner
Plans are read
"We don't know yet" is okay
Docs in the same PR

#PlatformEngineering #DevOps

---

## 57. Ranking / tier list

### Post 1. Topic: Tier list of ways to handle secrets

#### LinkedIn

Tier list: ways to handle secrets in Kubernetes on GCP.

S tier: No secret at all. Workload Identity gives access directly.
A tier: Secret Manager, pulled into the cluster by a tool like External Secrets.
B tier: Encrypted secrets in Git with SOPS and a KMS key.
C tier: Kubernetes Secrets created by hand.
D tier: Secrets in CI variables copied around.
F tier: Plain text in a YAML file in Git.

The best secret is the one that does not exist.

#### X

Secrets tier list (GKE):

S: no secret, Workload Identity
A: Secret Manager + External Secrets
B: SOPS in Git
C: hand-made k8s Secrets
F: plain YAML in Git

Best secret = no secret.

#Kubernetes #DevSecOps

### Post 2. Topic: Tier list of observability signals for payments

#### LinkedIn

Tier list: which signals matter most for a payment service.

S tier: Success rate of payments. The number customers feel.
A tier: Latency at p95 and p99. Slow checkout is lost money.
B tier: Traces. Show where the time goes.
C tier: Logs. Great for details after we know where to look.
D tier: CPU and memory. Useful for capacity, not for alerts.

Most teams start with D tier. Start with S tier instead.

#### X

Observability tier list for payments:

S: payment success rate
A: p95 and p99 latency
B: traces
C: logs
D: CPU and memory

Most teams start at D.
Start at S.

#Observability #SRE

---

## 58. Timeline / evolution post

### Post 1. Topic: How I deployed apps over the years

#### LinkedIn

How I deployed apps over the years.

2008: Copy files to a server with FTP. Pray.
2012: Shell scripts and a long Word document.
2016: Jenkins jobs. Many of them. Nobody knew which one was real.
2019: Docker images and Kubernetes. Things got repeatable.
2022: GitHub Actions and Helm. Faster and cleaner.
2026: GitOps with Flux. Same image across Dev, QA and Prod. AI helps write the pipelines.

What never changed: someone has to care whether it really works.

#### X

How I deployed apps:

2008: FTP and pray
2012: shell scripts
2016: too many Jenkins jobs
2019: Docker + k8s
2026: Flux GitOps + AI help

What never changed: someone has to care.

#DevOps #CareerGrowth

### Post 2. Topic: How monitoring changed

#### LinkedIn

How monitoring changed in my career.

Early days: Nagios. Is the server up? Green or red.
Then: Graphs everywhere. Many tools, none connected.
Then: Prometheus and Grafana. Metrics with labels. Real queries.
Then: Loki for logs and Tempo for traces. One place to jump between them.
Now: Grafana Cloud with SLOs. We ask "are users happy?" not "is the server up?"

The big change is not the tools.
It is the question we ask.

#### X

How monitoring changed:

Nagios: is the server up?
Prometheus: what are the metrics?
Loki + Tempo: what happened and where?
SLOs: are users happy?

The big change is the question, not the tool.

#Observability #Grafana

---

## 59. Teardown / breakdown

### Post 1. Topic: Teardown of a risky GitHub Actions workflow

#### LinkedIn

Teardown: a GitHub Actions workflow I reviewed (cleaned up and shared with permission).

What I found:
1. A GCP JSON key in secrets. Fix: Workload Identity Federation.
2. permissions: write-all. Fix: only what each job needs.
3. Third-party actions by tag. Fix: pin to a commit SHA.
4. No image scan. Fix: Trivy step that fails on critical CVEs.
5. Different image built for prod. Fix: promote the tested image.
6. Runs on pull_request_target with untrusted code. Fix: switch to pull_request.

Six problems. All fixed in one afternoon.

#### X

Teardown of one workflow:

JSON key in secrets
write-all permissions
actions by tag
no image scan
new image built for prod
pull_request_target misuse

6 problems. Fixed in 1 afternoon.

#GitHubActions #DevSecOps

### Post 2. Topic: Teardown of a DevOps CV

#### LinkedIn

Teardown of a typical DevOps CV I review (shared without names).

Problem 1: A list of 40 tools at the top. Fix: 8 to 10 that match the job.
Problem 2: "Responsible for CI/CD." Fix: "Built GitHub Actions pipelines that cut release time from 2 weeks to 1."
Problem 3: No numbers. Fix: costs saved, uptime, time cut, vulnerabilities fixed.
Problem 4: 5 pages. Fix: 2.
Problem 5: No link to real work. Fix: GitHub, a blog, or a talk.

A CV is not a tool list. It is proof of results.

#### X

DevOps CV teardown:

40 tools listed: cut to 10.
"Responsible for CI/CD": show the result.
No numbers: add them.
5 pages: make it 2.
No proof: add links.

A CV is proof, not a tool list.

#CareerGrowth #DevOps

---

## 60. Famous-company case study

### Post 1. Topic: Netflix Chaos Monkey

#### LinkedIn

How Netflix made failure normal.

Around 2011, Netflix built a tool called Chaos Monkey.
Its job: turn off random servers in production. On purpose.

Why would anyone do that?
Because servers fail anyway. Netflix wanted to find weak spots during work hours, with engineers ready, not at 3 AM.

What we can learn without being Netflix:
Kill a pod in QA and watch what happens.
Turn off one zone in a test.
Check that alerts fire.

We do small chaos tests in QA. Every one found something.

#### X

Netflix built Chaos Monkey to turn off random servers in prod. On purpose.

Why? Things fail anyway.
Better to find weak spots at 2 PM than 3 AM.

Start small: kill a pod in QA and watch.

#SRE #ChaosEngineering

### Post 2. Topic: Knight Capital and one bad deploy

#### LinkedIn

In 2012, a trading company called Knight Capital lost around 440 million dollars in about 45 minutes.

What happened, in simple words:
They deployed new code to their servers.
One server did not get the update.
An old feature flag, reused for something new, woke up old code on that one server.
It started trading wildly.

Lessons for every deploy, even today:
Every environment must run the same version.
Old code should be deleted, not just switched off.
Deploys must be automated and checked.
A kill switch must exist.

This is why "same image everywhere" matters so much to me.

#### X

2012: Knight Capital lost ~$440M in ~45 minutes.

1 of the servers missed a deploy.
A reused flag woke up old code.

Lessons:
same version everywhere,
delete old code,
automate deploys,
have a kill switch.

#DevOps #SRE

---

## 61. Customer / user success story

### Post 1. Topic: A team ships a new service in one day

#### LinkedIn

A small win from our platform's "customers", the developers.

A team needed a new payment service.

Before, this took about two weeks:
A ticket for a GCP project.
A ticket for IAM.
Copying YAML from another service.
Waiting for someone to set up dashboards.

This time:
They used our service template.
Terraform modules created the identity and access.
Flux picked up the new folder.
Grafana dashboards came built in.

They were in Dev the same day.

That is what a platform is for. Making the right way the fast way.

#### X

A team needed a new payment service.

Before: ~2 weeks of tickets.
Now: a template, TFE modules, Flux, built-in dashboards.

In Dev the same day.

Right way = fast way.

#PlatformEngineering #DevEx

### Post 2. Topic: QA gets stable environments

#### LinkedIn

Our QA team used to start every day with one question: "Is QA broken again?"

Config drifted. Versions did not match Prod. Tests failed for reasons that had nothing to do with the code.

What we changed:
QA uses the same Kustomize base as Prod, with a small overlay.
Images move from Dev to QA by PR, never by hand.
Flux keeps QA matching Git.
A QA health dashboard in Grafana.

A few weeks later, a tester said: "I forgot QA could be boring."

Best feedback we got all year.

#### X

QA used to ask every morning:
"Is QA broken again?"

Now: same base as Prod, PR-only promotion, Flux keeps it in sync.

Tester: "I forgot QA could be boring."

Best feedback all year.

#QA #GitOps

---

## 62. "How I did X" case study with results

### Post 1. Topic: Cutting critical vulnerabilities by 55%

#### LinkedIn

How we cut critical vulnerabilities by about 55% (at a past company).

Step 1: Scan everything. Trivy on every image in every PR.
Step 2: Fail on critical only at first. Not high, not medium. Less noise, more buy-in.
Step 3: Fix the base images. Most CVEs came from a few old base images.
Step 4: Automate updates with a bot that opens PRs for new base versions.
Step 5: A weekly report per team. Simple numbers, no shaming.

Result: critical vulnerabilities down by about 55%, and rollbacks cut in half thanks to better gates.

The trick was starting strict on a small thing, then growing.

#### X

How we cut critical vulns ~55%:

Trivy on every PR
Fail on critical only at first
Fix the few old base images
Bot PRs for updates
Weekly team report

Start strict on a small thing. Then grow.

#DevSecOps #Security

### Post 2. Topic: Cutting MTTR by 40%

#### LinkedIn

How we cut mean time to recovery by about 40%.

Problem: incidents took long because people spent the first 30 minutes just finding where the problem was.

What we did:
1. Linked traces to logs in Grafana. One click from a slow span to its log lines.
2. Added deploy markers on every main dashboard.
3. One runbook per alert, with the first 3 steps.
4. A "what changed?" panel: last Flux syncs and TFE runs.

Most of the time saved was in the first 15 minutes.
Finding the problem is often harder than fixing it.

#### X

How we cut MTTR ~40%:

Traces linked to logs
Deploy markers on dashboards
Runbook per alert
A "what changed?" panel

Most time saved: the first 15 minutes.
Finding is harder than fixing.

#SRE #Observability

---

## 63. Decision record ("Why we chose X over Y")

### Post 1. Topic: Overlays instead of branch per environment

#### LinkedIn

Decision record: why we use Kustomize overlays, not one Git branch per environment.

Option A: Branches. dev, qa, prod. Merge from one to the next.
Option B: One main branch. Folders for base and each environment overlay.

We chose B.

Why:
Branches drift. Merges get messy. Hotfixes go to one branch and get lost.
With folders, we see all environments side by side in one PR.
Promotion is a small change to an image tag in the next overlay.
Flux points each cluster to its own folder.

Trade-off: the folder layout needs care. Worth it.

#### X

Why overlays, not a branch per env:

Branches drift.
Merges get messy.
Hotfixes get lost.

Folders: all envs side by side, promotion = change one tag.

Flux points each cluster to its folder.

#GitOps #Kustomize

### Post 2. Topic: One GCP project per environment

#### LinkedIn

Decision record: one GCP project per environment.

Option A: One project for everything, split by names and labels.
Option B: Separate projects for Dev, QA and Prod.

We chose B.

Why:
IAM is clean. Dev access can never touch Prod by accident.
Billing is clear per environment.
Quotas do not fight each other.
A mistake in Dev stays in Dev.

Cost: more projects to manage.
Answer: the Terraform Enterprise blueprint creates them the same way every time.

Strong walls. Same house plan.

#### X

Why one GCP project per environment:

Clean IAM.
Clear billing.
Separate quotas.
A Dev mistake stays in Dev.

More projects? The TFE blueprint makes them all the same.

#GCP #Terraform

---

## 64. Original data / survey results

### Post 1. Topic: Three months of our alerts

#### LinkedIn

I looked at three months of our alerts. Here is what the data said.

Out of every 100 alerts:
About 45 were never acted on.
About 25 were duplicates of another alert.
About 20 needed real action.
About 10 were real problems found too late.

So less than a third of our alerts were useful at the moment they fired.

What we did next:
Deleted or quieted the 45.
Grouped the 25.
Wrote better rules for the 10.

Data first. Opinions second.

#### X

3 months of our alerts, per 100:

~45 never acted on
~25 duplicates
~20 needed action
~10 real but late

Under a third were useful.
Data first. Opinions second.

#Observability #SRE

### Post 2. Topic: What caused our incidents

#### LinkedIn

I grouped our last six months of incidents by cause.

Config changes: the biggest group, by far.
Dependencies outside our control: next.
Capacity and scaling: a few.
Code bugs: fewer than we expected.
Infra failures: almost none.

Big lesson: our own changes cause most of our own problems.

So we invested in:
Rendering and diffing every Kustomize overlay in CI.
Policy checks in TFE.
Deploy markers on dashboards.
Smaller, more frequent changes.

The cloud rarely broke. We did.

#### X

6 months of incidents by cause:

Config changes: top cause
Outside dependencies
Capacity
Code bugs
Infra failures: almost none

The cloud rarely broke.
We did.

#SRE #DevOps

---

## 65. Experiment report ("I tried X for 30 days")

### Post 1. Topic: AI review on every Terraform PR

#### LinkedIn

I used AI to review every Terraform PR for 30 days. Here is what happened.

What it did well:
Spotted missing labels and unpinned module versions.
Explained big plans in plain words.
Found two IAM roles that were wider than needed.

What it got wrong:
Suggested a "fix" that would have replaced a node pool.
Did not know our internal naming rules at first.
Sounded sure even when it was wrong.

Result: faster reviews, about 20% less time per PR. But a human still had the final say on every one.

AI as a second reviewer: yes. As the only reviewer: no.

#### X

30 days of AI reviewing every Terraform PR:

Good: found loose IAM, missing labels.
Bad: once suggested replacing a node pool.

~20% faster reviews.
Human still decides.

Second reviewer, yes. Only reviewer, no.

#AI #Terraform

### Post 2. Topic: Only pages, no other notifications

#### LinkedIn

For 30 days, I turned off every work notification except real pages.

No chat pings. No email pop-ups. I checked messages three times a day.

What happened:
Week 1: I felt like I was missing everything.
Week 2: Nobody noticed. Truly urgent things still reached me through pages.
Week 3: I finished a Terraform module in two days that had sat for weeks.
Week 4: My team started doing the same.

Deep work needs quiet. A pager covers what is urgent. The rest can wait two hours.

#### X

30 days: all notifications off except real pages.

Wk 1: FOMO
Wk 2: nobody noticed
Wk 3: finished a stuck Terraform module
Wk 4: the team copied it

Deep work needs quiet.

#Productivity #DevOps

---

## 66. Perspective switch

### Post 1. Topic: One outage, four views

#### LinkedIn

The same 20-minute outage, seen four ways.

The customer: "The checkout spun and spun. I bought it somewhere else."
The product manager: "We lost sales during a campaign. What happened?"
The developer: "My change passed every test. Why did it break in prod?"
The platform engineer: "The config in prod was different from QA. Again."

Four people. Four truths.

A good postmortem holds all four.
It does not just fix the config. It asks why QA and Prod were different, and how the customer will feel next time.

#### X

One outage, 4 views:

Customer: "I bought elsewhere."
PM: "We lost campaign sales."
Dev: "Tests passed!"
Platform: "Prod config differed. Again."

A good postmortem holds all 4.

#SRE #Incidents

### Post 2. Topic: One Terraform PR, four readers

#### LinkedIn

One Terraform PR, read by four people.

The author: "Small change. Just a new bucket."
The reviewer: "Why is it public?"
The security engineer: "Who can read this data, and is it logged?"
The engineer who finds it in two years: "Why does this exist and can I delete it?"

The best PR description answers all four:
What it is.
Why it is needed.
Who can access it.
When it can be removed.

Four lines. Huge difference.

#### X

One Terraform PR, 4 readers:

Author: "just a bucket"
Reviewer: "why public?"
Security: "who reads it?"
Future engineer: "can I delete it?"

Good PRs answer all 4.

#Terraform #CodeReview

---

## 67. Fill-in-the-blank

### Post 1. Topic: The best on-call engineer

#### LinkedIn

Fill in the blank:

"The best on-call engineer I ever worked with always ________."

Mine: always wrote down what they tried, even the things that did not work. Their notes saved the next person hours.

Curious to read the answers. I think this thread could become a great on-call guide.

#### X

Fill in the blank:

"The best on-call engineer I worked with always ______."

Mine: wrote down every step, even the failed ones.

#SRE #OnCall

### Post 2. Topic: The one Terraform rule

#### LinkedIn

Fill in the blank:

"The one Terraform rule I would never break is ________."

Mine: never apply from a laptop. Only from Terraform Enterprise or a pipeline.

I will collect the best answers into one list and share it next week.

#### X

Fill in the blank:

"The one Terraform rule I'd never break is ______."

Mine: never apply from a laptop.

Best answers go into a list next week.

#Terraform #IaC

---

## 68. Crowdsourced list

### Post 1. Topic: Best kubectl shortcuts

#### LinkedIn

Let us build a list together. Drop the best kubectl alias or shortcut in the comments.

I will start:

alias k=kubectl
k get events --sort-by=.lastTimestamp
k logs deploy/payments --previous

And my favourite tool on top: k9s.

The best ones go into a shared cheat sheet. Credit to everyone who adds one.

#### X

Let's build a list.
Best kubectl alias or shortcut?

Mine:
alias k=kubectl
k get events --sort-by=.lastTimestamp
k logs --previous

Best ones go into a cheat sheet.

#Kubernetes #DevOps

### Post 2. Topic: The one panel every service needs

#### LinkedIn

Crowdsourcing time.

If every service could have only one Grafana panel, which one should it be?

My pick: success rate over the last hour, with deploy markers on it.

Some will say latency. Some will say saturation. Let us see what wins.

I will turn the top answers into a starter dashboard and share the JSON.

#### X

If every service could have only 1 Grafana panel, which one?

Mine: success rate, with deploy markers.

Top answers become a starter dashboard.

#Grafana #Observability

---

## 69. AMA / Ask me anything

### Post 1. Topic: AMA on GCP platforms and Germany

#### LinkedIn

Ask me anything. This Friday, I will answer every question in the comments.

Topics I know well:
GCP, GKE and Terraform Enterprise.
Flux GitOps and Kustomize.
DevSecOps pipelines in GitHub Actions.
Grafana Cloud and the PLGT stack.
Moving to Germany as an engineer, Blue Card and job hunting.

No question is too basic. Most good questions start as "this might be silly, but...".

Drop them below.

#### X

AMA this Friday.

GCP, GKE, Terraform Enterprise, Flux, GitHub Actions, Grafana.
Also: moving to Germany as an engineer.

No question too basic.
Drop them below.

#AMA #DevOps

### Post 2. Topic: Answers from last AMA

#### LinkedIn

Last week's AMA had great questions. Here are the top three with short answers.

Q: Flux or ArgoCD for a first GitOps setup?
A: ArgoCD if the team wants a UI. Flux if the team likes plain YAML and many clusters.

Q: Is Terraform Enterprise worth it over plain Terraform in CI?
A: For many teams and strict rules, yes. Policies, private registry and audit logs save a lot of glue code.

Q: How long did it take to feel at home in Germany?
A: About two years. The language was the key.

More answers in the comments.

#### X

Top AMA answers:

Flux or ArgoCD?
UI lovers: Argo. Plain YAML: Flux.

TFE worth it?
Many teams + strict rules: yes.

Home in Germany?
~2 years. Language was the key.

#AMA #DevOps

---

## 70. Feedback request / "Roast my..."

### Post 1. Topic: Roast my Flux repo layout

#### LinkedIn

Roast my Flux repo layout. Be honest.

clusters/
  dev/
  qa/
  prod/
apps/
  payments-api/
    base/
    overlays/dev
    overlays/qa
    overlays/prod
infrastructure/
  ingress/
  monitoring/

Each cluster folder points to the apps and infrastructure it needs.
Promotion is a PR that changes the image tag in the next overlay.

What would break first at 50 services? I want to know before it happens.

#### X

Roast my Flux layout:

clusters/dev qa prod
apps/<svc>/base + overlays
infrastructure/

Promotion = PR changing a tag.

What breaks first at 50 services?

#Flux #GitOps

### Post 2. Topic: Roast my SLO

#### LinkedIn

Roast my SLO. Here it is:

Service: payment API
SLI: share of requests that return a non-5xx answer in under 800 ms
Target: 99.9% over 30 days
Alert: when we burn the error budget 14 times faster than normal for 1 hour

Things I am not sure about:
Should 4xx count as bad?
Is 800 ms too generous for checkout?
Is 30 days the right window?

Tear it apart. Better SLOs come from hard questions.

#### X

Roast my SLO:

Non-5xx under 800 ms
99.9% over 30 days
Alert on 14x burn rate for 1h

Should 4xx count?
Is 800 ms too generous?

Tear it apart.

#SRE #Observability

---

## 71. Help request

### Post 1. Topic: TFE workspace sprawl

#### LinkedIn

Asking for help from the Terraform community.

Our Terraform Enterprise setup is growing fast. One workspace per environment per stack made sense at first. Now the list is long.

Problems:
Hard to find the right workspace.
Variable sets are getting messy.
Upgrading a module across all workspaces takes a lot of PRs.

How do other teams handle this?
Projects and tags? Stacks? A bot for module upgrades?

Real stories welcome. I will share what we decide.

#### X

Help, Terraform folks:

Our TFE workspaces keep growing.
Hard to find things.
Module upgrades = many PRs.

How do other teams handle it?
Projects? Tags? Upgrade bots?

#Terraform #PlatformEngineering

### Post 2. Topic: Testing Cloud Armor rules safely

#### LinkedIn

Question for GCP folks: how do teams test Cloud Armor rules before Prod?

Our current way:
New rules start in preview mode.
We watch the logs for a few days.
Then we switch to enforce.

What worries me:
Preview logs are noisy.
QA traffic is not like real customer traffic.

Has anyone built a good way to replay real traffic patterns or score rules before enforcing?

Thanks in advance. I will collect the best tips in a follow-up post.

#### X

GCP folks:
how do teams test Cloud Armor rules before Prod?

We use preview mode, watch logs, then enforce.

But QA traffic is not real traffic.

Better ideas?

#GCP #Security

---

## 72. Shoutout / spotlight on someone else's work

### Post 1. Topic: Open-source maintainers

#### LinkedIn

A shoutout to the open-source maintainers behind the tools we use every day.

Flux. Kustomize. Prometheus. Loki. Tempo. Trivy. OpenTelemetry. And many more.

Our payment platform runs on work done by people we have never met. Often in their free time.

What we try to give back:
Clear bug reports with steps to reproduce.
Small doc fixes when we find gaps.
Thanks in the issue, not just complaints.

Next time a tool saves the day, consider a star, a doc PR or just a thank-you.

#### X

Shoutout to open-source maintainers.

Flux, Kustomize, Prometheus, Loki, Tempo, Trivy, OTel.

Our platform runs on their free time.

Give back: clear bug reports, doc fixes, a simple thanks.

#OpenSource #DevOps

### Post 2. Topic: A teammate who fixed the docs

#### LinkedIn

Spotlight on [teammate name]. (Add the name before posting.)

Nobody asked them to. They just did it.

They went through all our runbooks.
Fixed broken links.
Added real commands.
Deleted the ones that no longer made sense.
Put a "last checked" date on each one.

Two weeks later, during a late-night alert, a new team member fixed the issue alone using one of those runbooks.

This kind of work never shows up in a demo. It shows up when it matters.

#### X

Spotlight on [teammate].

Quietly fixed every runbook.
Real commands.
Dead ones deleted.
Dates added.

2 weeks later a new joiner fixed a night alert alone with one.

Invisible work, real impact.

#Teamwork #SRE

---

## 73. Tag-a-person post

### Post 1. Topic: The person who saved prod

#### LinkedIn

Tag the engineer who once saved production and never asked for credit.

Everyone has one.
The one who noticed the odd graph at 4 PM.
The one who said "wait, let us check the plan again".
The one who stayed until it was green.

Mine is a former teammate who caught a destroy in a Terraform plan just before apply. It would have taken down a whole environment.

Tag them. They deserve to hear it.

#### X

Tag the engineer who once saved prod and never asked for credit.

Mine caught a destroy in a Terraform plan seconds before apply.

They deserve to hear it.

#DevOps #Teamwork

### Post 2. Topic: The person who made Kubernetes click

#### LinkedIn

Tag the person who first explained Kubernetes in a way that finally clicked.

For me it was a colleague who drew everything on a whiteboard.
Pods as people. Nodes as houses. Services as phone numbers that never change.

Ten minutes. Everything I had read for weeks suddenly made sense.

Good teachers are rare in tech. Let them know.

#### X

Tag the person who first made Kubernetes click.

Mine drew it on a whiteboard:
pods = people
nodes = houses
services = phone numbers

10 minutes. It all made sense.

#Kubernetes #Learning

---

## 74. Collaborative / co-authored post

### Post 1. Topic: Platform and security, one post

#### LinkedIn

Co-written with [security colleague name]. (Add the name and tag before posting.)

Topic: critical CVEs in a payment platform.

Platform view (me):
I want fixes to flow through the normal pipeline. Same image, same promotion, no special path.

Security view (them):
I want proof the fix is live in Prod, not just merged.

What we agreed:
Every critical CVE gets a ticket with an owner.
The fix goes through the normal Dev, QA, Prod path, just faster.
Trivy scans the running images too, not only new builds.

Two views. One process.

#### X

Platform + security, one post:

Me: fixes use the normal pipeline.
Them: prove it is live in Prod.

Agreed:
owner per CVE,
normal path, just faster,
scan running images too.

#DevSecOps #Security

### Post 2. Topic: Writing a book as two authors

#### LinkedIn

Co-writing a book taught me more than writing alone ever did.

When Nilanjana Saha and I wrote our GKE book, we had very different styles.

What worked:
We split chapters by strength, then reviewed each other.
We agreed on one rule: if the other person does not understand it, the reader will not either.
We kept one shared list of terms, so the book used the same words everywhere.

It is a lot like code review.
Two people. One voice. Better result.

#### X

Co-writing our GKE book with Nilanjana Saha taught me:

Split by strength.
Review each other.
If my co-author doesn't get it, readers won't.

Just like code review.

#Writing #GKE

---

## 75. Build in public / progress log

### Post 1. Topic: Building a service template, week 6

#### LinkedIn

Building a "golden path" service template for our platform. Week 6 update.

Done:
Kustomize base with probes, limits and a PodDisruptionBudget.
Terraform module for Workload Identity and access.
GitHub Actions workflow with tests, Trivy and promotion.
Default Grafana dashboard.

Struggling with:
How much to lock down vs let teams change.
Keeping the template up to date after teams copy it.

Next week:
Test it with one real team and watch where they get stuck.

I will keep sharing the progress, mistakes included.

#### X

Building our golden path template, wk 6:

Done: Kustomize base, WIF module, CI with Trivy, default dashboard.

Stuck on: how much to lock down.

Next: test with 1 real team.

#PlatformEngineering #BuildInPublic

### Post 2. Topic: An AI helper for Flux errors, week 3

#### LinkedIn

Side project in public. Week 3 of a small AI helper for Flux errors.

The idea: when a Flux sync fails, a bot reads the event, the last commit and the rendered YAML, then posts a plain-English guess in our team chat.

Week 3 progress:
It finds missing secrets and bad patch targets most of the time.
It is wrong on CRD version problems.
It sometimes writes very long answers. Working on that.

Rule: it only suggests. It never changes anything.

Next week: test it on old incidents and count how often it was right.

#### X

Week 3: an AI helper for Flux errors.

Reads the event + commit + YAML.
Posts a plain-English guess.

Good at: missing secrets, bad patches.
Bad at: CRD versions.

It suggests. It never changes anything.

#AI #GitOps

---

## 76. Serialized story / episodes

### Post 1. Topic: The day Cloud Armor blocked real customers. Part 1

#### LinkedIn

The day our own security rule blocked real customers. Part 1.

It was a calm Tuesday.
We had moved a new Cloud Armor rule from preview to enforce the day before. It blocked some odd traffic patterns. The logs looked clean.

Then, around lunchtime, a message from a business colleague:
"Some customers say checkout gives an error. Only on mobile. Only in one region."

Our dashboards? Green.
Our error rate? Normal.

Because the blocked requests never reached our services.

Part 2 tomorrow: how we found it, and the rule we still follow today.

#### X

The day our own security rule blocked real customers. Part 1.

New Cloud Armor rule.
Logs clean.
Dashboards green.

Then: "Mobile checkout fails in one region."

Blocked requests never reach our metrics.

Part 2 tomorrow.

#GCP #Security

### Post 2. Topic: The day Cloud Armor blocked real customers. Part 2

#### LinkedIn

Part 2 of the day our own security rule blocked real customers.

How we found it:
We checked the load balancer logs, not the app logs.
There it was. A wave of 403s from one mobile network, all matched by the new rule.

What happened:
One mobile network sent a header pattern our rule thought was an attack.

What we did:
Moved the rule back to preview within minutes.
Tuned it.
Added a Grafana panel for Cloud Armor blocks per rule.
Added an alert when blocks suddenly jump.

The rule we follow now: watch the edge, not just the app.

#### X

Part 2: how we found it.

Load balancer logs, not app logs.
A wave of 403s from one mobile network.

Fix: rule back to preview, tuned, new panel and alert for blocks.

Watch the edge, not just the app.

#GCP #Observability

---

## 77. "Day X of 100" streak posts

### Post 1. Topic: Day 12 of 100 Terraform tips

#### LinkedIn

Day 12 of 100 days of Terraform tips.

Today: use lifecycle rules to protect things that must never be deleted.

lifecycle {
  prevent_destroy = true
}

We add this to key resources like production databases and KMS keys.

If a plan tries to destroy them, Terraform stops with an error. Someone has to remove the rule in a PR first. That PR gets a lot of attention.

Small line. Big safety net.

Back tomorrow with Day 13.

#### X

Day 12/100 Terraform tips:

lifecycle {
  prevent_destroy = true
}

Put it on prod databases and KMS keys.
To delete them, someone must first remove it in a PR.

Small line. Big safety net.

#Terraform #100DaysOfCode

### Post 2. Topic: Day 47 of 100 PromQL

#### LinkedIn

Day 47 of 100 days of PromQL.

Today: success rate as a ratio, not a raw count.

sum(rate(http_requests_total{code!~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))

Why a ratio?
100 errors on a busy day might be fine.
100 errors at night might be a disaster.
A ratio works at any traffic level.

This one query is the base of most of our payment SLOs.

Day 48 tomorrow.

#### X

Day 47/100 PromQL:

Use a ratio, not a raw count.

good requests / all requests

100 errors at peak = fine.
100 errors at night = disaster.

A ratio works at any traffic.

#Prometheus #SRE

---

## 78. Year-in-review / annual recap

### Post 1. Topic: My year in review

#### LinkedIn

My year in review. The short, honest version.

Work:
Platform work on Kubernetes with policy-as-code and better observability.
Then a new role on a payment platform on GCP. Terraform Enterprise, Flux, GKE, Grafana Cloud.

Learning:
Finished a full-stack bootcamp. Now I understand developers much better.
Our GKE book came out.

Life:
The running streak kept going. Rain, snow and all.
My German got better. Still not good enough. Still trying.

Biggest lesson: steady beats fast. Every single time.

#### X

My year, short version:

New role on a GCP payment platform
Finished a full-stack bootcamp
Our GKE book came out
Running streak still alive
German: better, not good yet

Steady beats fast.

#YearInReview #DevOps

### Post 2. Topic: The platform's year in numbers

#### LinkedIn

Our platform's year in numbers. (Approximate, rounded.)

Releases to Prod: several hundred, all through GitOps.
Manual prod changes: zero that stayed. Flux reverted the rest.
Critical CVEs open longer than a week: close to none.
Payment uptime: above our 99.9% target.
Alerts: fewer than last year, and more useful.
Terraform modules shared across teams: growing every month.

Numbers do not tell the whole story. Behind each one is a lot of small, careful work by many people.

#### X

Our platform's year:

100s of releases, all via GitOps
0 manual prod changes that stayed
Critical CVEs closed fast
Uptime above 99.9%
Fewer, better alerts

Many people, small careful work.

#PlatformEngineering #SRE

---

## 79. Goals / accountability post

### Post 1. Topic: 2027 goals

#### LinkedIn

My goals for 2027. Writing them here so people can hold me to them.

1. Pass the Certified Kubernetes Security Specialist (CKS) exam.
2. Reach B1 German.
3. Write one technical post every week.
4. Mentor 20 engineers moving into cloud or to Germany.
5. Give one talk at a meetup.
6. Keep the running streak alive.

I will share a progress update every quarter. Including the misses.

#### X

My 2027 goals:

CKS cert
B1 German
1 tech post a week
Mentor 20 engineers
1 meetup talk
Keep the run streak

Quarterly updates. Misses included.

#Goals #DevOps

### Post 2. Topic: Q1 platform goals

#### LinkedIn

Our platform goals for next quarter. Shared in public so we stay honest.

1. Every service has an SLO in Grafana Cloud.
2. Zero service account keys in any pipeline.
3. Every Terraform module has a version and a README.
4. Every alert has a runbook link.
5. New service to Dev in under one day for every team.

Each one has an owner and a check we can measure.

I will post the results at the end of the quarter, good or bad.

#### X

Platform goals next quarter:

SLO for every service
0 SA keys in pipelines
Every module versioned + README
Every alert has a runbook
New service to Dev in < 1 day

Results posted, good or bad.

#PlatformEngineering #SRE

---

## 80. Meme / humor post

### Post 1. Topic: The happiest Terraform output

#### LinkedIn

[Meme image: a person crying happy tears]

Top text: Terraform plan after a 3-hour refactor
Bottom text: "No changes. Your infrastructure matches the configuration."

The most beautiful sentence in DevOps.

When we move modules around, rename things and add moved blocks, and the plan shows nothing to change, that is pure joy.

Anyone else feel this?

#### X

[Meme: happy tears]

Me after a 3-hour Terraform refactor:

"No changes. Your infrastructure matches the configuration."

Most beautiful sentence in DevOps.

#Terraform #DevOpsHumor

### Post 2. Topic: Drake meme for GitOps

#### LinkedIn

[Meme image: the two-panel "no / yes" format]

Panel 1 (no): kubectl edit deployment in prod at 6 PM
Panel 2 (yes): a 3-line PR, reviewed, merged, and synced by Flux

Funny because we have all been tempted by panel 1.
Panel 1 is fast for 2 minutes and painful for 2 days.

GitOps is not about being slow. It is about being sure.

#### X

[Meme: no / yes]

No: kubectl edit in prod at 6 PM
Yes: 3-line PR, merged, Flux syncs

Panel 1 is fast for 2 min and painful for 2 days.

#GitOps #DevOpsHumor

---

## 81. Short video / talking-head / reel

### Post 1. Topic: 60-second video script on GKE cost

#### LinkedIn

Video script (60 seconds): 3 quick ways to cut GKE costs.

[0 to 5 sec] "Our GKE bill is probably too high. Here are 3 quick fixes."
[5 to 20 sec] "One. Set resource requests based on real usage. Most pods ask for far more than they use."
[20 to 35 sec] "Two. Scale non-prod down at night and on weekends."
[35 to 50 sec] "Three. Use Spot VMs for workloads that can restart, like batch jobs."
[50 to 60 sec] "Bonus: label everything so every euro has an owner. Follow for more."

Caption: Which one would save the most in our setup?

#### X

New video: 3 quick GKE cost cuts in 60 sec.

1. Right-size requests
2. Scale non-prod down at night
3. Spot VMs for batch

Bonus: label everything.

#GKE #FinOps

### Post 2. Topic: GitOps in 45 seconds

#### LinkedIn

Video script (45 seconds): GitOps explained.

[0 to 5 sec] "GitOps in 45 seconds. Ready?"
[5 to 15 sec] "Git holds what we want the system to look like."
[15 to 25 sec] "A tool inside the cluster, like Flux, keeps checking Git."
[25 to 35 sec] "If the cluster is different, it fixes the cluster. Not the other way round."
[35 to 45 sec] "Release is a PR. Rollback is a revert. Done."

Shot tip: film it walking, one sentence per cut. Simple wins.

#### X

GitOps in 45 sec:

Git holds what we want.
Flux checks Git.
Cluster drifts? Flux fixes it.
Release = PR.
Rollback = revert.

Video on my profile.

#GitOps #Kubernetes

---

## 82. Poem / rhyme / haiku post

### Post 1. Topic: On-call haiku

#### LinkedIn

Three on-call haiku.

Phone glows at 3 AM.
Error rate climbs like a hill.
Coffee, then the logs.

Flux shows one red line.
A secret name had a typo.
Fixed. Back to my dreams.

Dashboard green again.
Postmortem waits for the sun.
No blame, just lessons.

Writing these made me smile. On-call is hard. A little humour helps.

#### X

On-call haiku:

Phone glows at 3 AM.
Error rate climbs like a hill.
Coffee, then the logs.

#SRE #OnCall

### Post 2. Topic: A rhyme about drift

#### LinkedIn

A small rhyme about Terraform drift.

I clicked in the console, just one little change,
It felt very quick, it did not feel strange.
But Terraform woke and it read every line,
And said, "This is not what I have as mine."

The plan wanted changes I did not expect,
A rule I had added it tried to reject.
So now I write code before touching a thing,
And let the PR be the place where we sing.

Drift is small today and big tomorrow. Code first.

#### X

I clicked in the console, one change, nothing more.
Terraform noticed and settled the score.

Now code comes first, then the PR.
No drift, no fights, no midnight war.

#Terraform #IaC

---

## 83. Live-thread / live coverage

### Post 1. Topic: Live notes from a platform event

#### LinkedIn

Live from [event name] today. Updating this post through the day. (Add the event before posting.)

10:00. Opening talk: platform teams should measure developer happiness, not only uptime. Agree.
11:30. Talk on OpenTelemetry at scale. Key tip: decide sampling early, before the bill decides it.
13:00. Lunch chat with an SRE team that runs Flux on 40 clusters. They split repos by team.
14:30. Panel on AI in operations. Everyone agrees: AI suggests, humans approve.
16:00. Best line of the day: "A platform is only as good as its worst error message."

More notes tomorrow.

#### X

Live from [event]:

10:00 Measure dev happiness, not only uptime
11:30 OTel: pick sampling before the bill does
14:30 AI suggests, humans approve
16:00 "A platform is only as good as its worst error message"

#PlatformEngineering #DevOps

### Post 2. Topic: Live updates during a GKE upgrade

#### LinkedIn

Doing a planned GKE upgrade in QA right now. Live notes for anyone curious.

09:00. Checked deprecated APIs. All clear.
09:10. Confirmed PodDisruptionBudgets on all payment services.
09:15. Control plane upgrade started.
09:40. Control plane done. No impact.
09:45. Node pool upgrade started with surge.
10:30. Halfway. One pod slow to become ready. Probe timeout too short. Noted.
11:20. Done. All green. Error rate flat.

Next: fix the probe, then Prod next week.

#### X

Live: GKE upgrade in QA

09:00 deprecated APIs: clear
09:15 control plane started
09:40 done, no impact
09:45 node pools with surge
10:30 one slow probe
11:20 all green

Prod next week.

#GKE #Kubernetes

---

## 84. Product launch / side-project demo

### Post 1. Topic: Launching my portfolio site

#### LinkedIn

I just launched my new portfolio site.

Why I built it:
My LinkedIn shows the jobs. It does not show the work.

What is on it:
16+ years of experience, from storage admin to platform engineer.
Projects like the payment platform on GCP, policy-driven Kubernetes and multi-cloud migrations.
Our GKE book.
Mentoring sessions for cloud careers and moving to Germany.

It is simple HTML, CSS and JavaScript. No framework. Fast and boring, like good infrastructure.

Feedback welcome. Link in the comments.

#### X

Launched my portfolio site.

Jobs are on LinkedIn.
The work is here: GCP payments, Kubernetes, the GKE book, mentoring.

Plain HTML, CSS, JS.
Fast and boring, like good infra.

#BuildInPublic #DevOps

### Post 2. Topic: Internal launch of the service template

#### LinkedIn

Internal launch day. Our new service template is live for every team.

What it gives a team in one PR:
A GKE-ready Kustomize base with good defaults.
Its own service account with Workload Identity.
A GitHub Actions pipeline with tests, Trivy and promotion.
A Grafana dashboard and SLO out of the box.
A README with the 5 lines that matter.

Demo video in our team channel. First two teams are already using it.

Feedback is the next feature.

#### X

Launch: our new service template.

One PR gives:
Kustomize base
Workload Identity
CI with Trivy
Dashboard + SLO
A real README

2 teams already on it.

#PlatformEngineering #DevEx

---

## 85. Newsletter or long-form teaser

### Post 1. Topic: Teaser for a landing zone article

#### LinkedIn

I wrote a long article on how we design GCP landing zones for a payment platform.

A few things inside:
Why we use one project per environment.
How the Terraform Enterprise blueprint creates every project the same way.
Where Cloud Armor, IAM and Artifact Registry fit.
The three mistakes we fixed in the first version.

It is long, but written in plain words with diagrams.

Link in the comments. Would love feedback from other GCP folks.

#### X

New article:
how we design GCP landing zones for payments.

1 project per env
TFE blueprint
Cloud Armor + IAM
3 mistakes we fixed

Link below.

#GCP #Terraform

### Post 2. Topic: Teaser for an observability article

#### LinkedIn

New long read: what we learned running the PLGT stack with Grafana Cloud for payments.

Inside:
How we picked SLIs that match what customers feel.
How one label nearly doubled our bill, and how we caught it.
Linking traces to logs so on-call finds problems faster.
Our alert rules, with real examples.

If observability feels like "many tools, little clarity", this one is for anyone in that spot.

Link in the comments.

#### X

New long read:
running PLGT + Grafana Cloud for payments.

SLIs customers feel
The label that nearly doubled our bill
Traces linked to logs
Real alert rules

Link below.

#Observability #Grafana

---

## 86. Steal-my-template / prompt-sharing

### Post 1. Topic: AI prompt for reviewing a Terraform plan

#### LinkedIn

Steal my prompt. I use it to get an AI second opinion on a Terraform plan.

"Act as a senior GCP platform engineer. Here is a Terraform plan. List:
1. Every resource that will be destroyed or replaced, and why.
2. Any IAM change that gives more access than before.
3. Anything that becomes public.
4. Anything missing labels.
5. The top risk in one sentence.
Do not suggest applying. Only review."

Paste the plan below it. Never paste secrets.

It does not replace a human review. It catches things tired eyes miss.

#### X

Steal my prompt for Terraform plan review:

"Act as a senior GCP engineer. List destroys, wider IAM, anything public, missing labels, top risk. Only review."

Never paste secrets.
Human still decides.

#AI #Terraform

### Post 2. Topic: A blameless postmortem template

#### LinkedIn

Steal my postmortem template. Simple and blameless.

1. Summary: What happened, in 3 lines.
2. Impact: Who was affected and for how long.
3. Timeline: Times and actions, in order.
4. Detection: How did we find out? Could we have found out sooner?
5. Root causes: Usually more than one.
6. What went well.
7. What was hard.
8. Action items: Each with an owner and a date.

Rule: no names in "what went wrong". We fix systems, not people.

#### X

Steal my postmortem template:

Summary
Impact
Timeline
Detection
Root causes
What went well
What was hard
Actions with owner + date

Fix systems, not people.

#SRE #Incidents

---

## 87. Text-only "broetry"

### Post 1. Topic: The deploy that failed

#### LinkedIn

Friday.
4:55 PM.

One small change.
"Just a config tweak."

Merged.
Flux synced.

Error rate went up.

My heart went down.

git revert.
Merged.
Flux synced.

Green again.
3 minutes.

That day I learned something.

The fastest fix is not a clever fix.

It is a revert.

And GitOps makes reverts boring.

Boring saved my weekend.

#### X

Friday. 4:55 PM.
One small config change.

Errors up.
Heart down.

git revert.
Flux synced.
Green in 3 minutes.

Boring saved my weekend.

#GitOps #DevOps

### Post 2. Topic: Running and consistency

#### LinkedIn

Day 1.
I ran 10 minutes.
I hated it.

Day 30.
I ran 20 minutes.
I still did not love it.

Day 365.
I ran in snow.
Smiling.

Day 1,371.
Still running.

Nobody saw most of those runs.

Same with platform work.

Nobody sees the alert we deleted.
The module we cleaned.
The runbook we fixed.

But one day, it all shows up.

Usually during an incident that does not happen.

#### X

Day 1: hated running.
Day 365: running in snow, smiling.
Day 1,371: still going.

Platform work is the same.
Nobody sees the small daily fixes.

Until the incident that never happens.

#Consistency #SRE

---

# Part B. Storytelling structures (used inside a post)

---

## 88. PAS: Problem, Agitate, Solution

### Post 1. Topic: Service account keys

#### LinkedIn

Problem:
Our old pipelines used GCP service account keys. JSON files stored as secrets.

Agitate:
Those keys never expire.
They get copied into laptops, chats and old repos.
If one leaks, someone can act as our deployer until we notice. And we might not notice for months.
For a payment platform, that is a nightmare.

Solution:
We moved every pipeline to Workload Identity Federation.
GitHub Actions gets a short token for each run.
Access is locked to our repo and branch.
Then we deleted every key and blocked new ones with an org policy.

No keys. Nothing to leak.

#### X

Problem: SA keys in pipelines.

Agitate: they never expire, get copied everywhere, and a leak lasts months.

Solution: Workload Identity Federation, short tokens, then an org policy blocking new keys.

#GCP #DevSecOps

### Post 2. Topic: Slow pipelines

#### LinkedIn

Problem:
Our main pipeline took 28 minutes.

Agitate:
Developers pushed, then went for coffee. Then checked chat. Then forgot what they were testing.
Small fixes became half-day tasks.
Some people started skipping tests "just this once".

Solution:
Cached dependencies between runs.
Ran tests in parallel jobs.
Only built images when app code changed.
Moved slow end-to-end tests to run after merge in Dev.

Now: about 9 minutes.

A fast pipeline is a security feature too. People stop going around it.

#### X

Problem: 28-minute pipeline.

Agitate: people lost focus and skipped tests.

Solution: caching, parallel jobs, build only on code change.

Now ~9 minutes.
Fast pipelines stop people going around them.

#GitHubActions #DevEx

---

## 89. AIDA: Attention, Interest, Desire, Action

### Post 1. Topic: Trivy in every PR

#### LinkedIn

Attention:
A critical CVE was sitting in one of our base images. For months. Nobody knew.

Interest:
We found it only when we added Trivy to the pipeline. The first scan lit up like a Christmas tree.

Desire:
Now every PR shows the vulnerabilities before merge. Critical ones block the build. Developers see the fix right there: which package, which version. Most fixes take 5 minutes.

Action:
Add one Trivy step to the pipeline this week. Start by failing only on critical. Grow from there.

What we cannot see, we cannot fix.

#### X

A critical CVE sat in our base image for months.

Found it on day 1 of adding Trivy.

Now every PR shows vulns before merge.

Add one Trivy step this week.
Fail on critical only. Grow later.

#DevSecOps #Security

### Post 2. Topic: Free CV review

#### LinkedIn

Attention:
Most DevOps CVs I review have the same three mistakes.

Interest:
A list of 40 tools. No numbers. Five pages.
Recruiters spend seconds on each CV. These three mistakes waste those seconds.

Desire:
After one review session, most people cut their CV in half and add real results. Several have told me the replies started coming within weeks.

Action:
I do CV reviews for cloud and DevOps engineers, especially for roles in Germany and Europe. The first 15-minute call is free. Link on my profile.

#### X

Most DevOps CVs have 3 mistakes:

40 tools listed
No numbers
5 pages

Fix them and replies start coming.

Free 15-min call for CV reviews. Link in bio.

#CareerGrowth #DevOps

---

## 90. BAB: Before, After, Bridge

### Post 1. Topic: Terraform modules

#### LinkedIn

Before:
Every team wrote its own Terraform for GCP projects. Five teams, five ways. Different labels. Different IAM. Different bugs.

After:
One versioned module set in a private registry. Every project made the same way. Labels, IAM and logging built in. A new project takes one short PR.

Bridge:
We picked the three most copied pieces of code.
Turned them into modules with clear inputs and a README.
Published them in Terraform Enterprise's private registry.
Helped each team switch, one at a time.

No big bang. Just the most copied code first.

#### X

Before: 5 teams, 5 ways to build a GCP project.

After: one versioned module set in the TFE registry.

Bridge: start with the 3 most copied pieces of code. Switch teams one at a time.

#Terraform #PlatformEngineering

### Post 2. Topic: On-call with runbooks

#### LinkedIn

Before:
An alert fired. The on-call engineer opened chat and asked, "Has anyone seen this before?" Then waited.

After:
An alert fires. It links to a runbook. The first three steps are right there, with real commands. Most alerts are fixed alone in minutes.

Bridge:
After each incident, we wrote or fixed one runbook.
We added the runbook link to the alert itself.
We tested runbooks with new team members. If they got stuck, we fixed the doc.

One incident, one runbook. It adds up fast.

#### X

Before: alert fires, "has anyone seen this?"

After: alert links to a runbook with real commands.

Bridge: after every incident, fix 1 runbook and link it in the alert.

#SRE #OnCall

---

## 91. SLA: Struggle, Lesson, Action

### Post 1. Topic: Loki costs

#### LinkedIn

Struggle:
Our log costs kept going up every month. Loki was storing everything. Debug logs. Health check logs. Logs nobody ever searched.

Lesson:
More logs do not mean more insight. Most of our logs were noise. We paid to store noise.

Action:
Turned off debug logs in Prod by default.
Dropped health check logs at the collector.
Set different retention per environment. Short in Dev, longer in Prod.
Moved important numbers from logs to metrics.

Log volume dropped a lot. Searching got faster too.

#### X

Struggle: log costs up every month.

Lesson: more logs is not more insight.

Action: no debug in Prod, drop health checks, shorter retention in Dev, numbers as metrics.

Smaller bill. Faster search.

#Observability #Grafana

### Post 2. Topic: German interviews

#### LinkedIn

Struggle:
My first job interviews in Germany did not go well. I knew the tech. But I talked too long and too broadly.

Lesson:
German interviewers often want a direct, clear answer first. Then details if they ask.

Action:
I practised the "answer first" method.
Question: "How should a pipeline be secured?"
First line: "Short-lived credentials, scanning, and signed images."
Then one example.
Then stop.

My next interviews felt like conversations, not speeches.

#### X

Struggle: my first German interviews went badly.

Lesson: answer first, details after.

Action: one clear line, one example, then stop.

Interviews turned into conversations.

#Germany #JobSearch

---

## 92. STAR: Situation, Task, Action, Result

### Post 1. Topic: A bank's cloud migration

#### LinkedIn

Situation:
A major bank ran a big monolith on old infrastructure. Costs were high. Changes were slow.

Task:
Lead the move to microservices across AWS, Azure and GCP, without breaking banking services.

Action:
We split the monolith step by step, starting with the least risky parts.
Built repeatable infrastructure with code.
Set up CI/CD for every new service.
Ran old and new side by side before each switch.

Result:
More than 3 million euros saved every year. Faster releases. Fewer late-night calls.

Big results usually come from small, safe steps.

#### X

S: a bank's monolith, costly and slow.
T: move to microservices on 3 clouds.
A: small safe steps, IaC, CI/CD, old and new side by side.
R: €3M+ saved per year.

#CloudMigration #DevOps

### Post 2. Topic: CIS benchmarks on a payment platform

#### LinkedIn

Situation:
Our payment platform on GCP needed to meet CIS benchmarks. The first scan showed a long list of findings.

Task:
Fix them without slowing down the teams shipping features.

Action:
Grouped findings by type, not by resource.
Fixed most of them once, in shared Terraform modules.
Added policy checks in TFE so the same issues could not come back.
Tracked critical CVEs in payment repos with clear owners.

Result:
The findings list shrank quickly, and new projects started clean by default.

Fix the template, not the copies.

#### X

S: long CIS findings list on GCP.
T: fix it without slowing teams.
A: fix in shared modules, add TFE policy checks.
R: list shrank, new projects start clean.

Fix the template, not the copies.

#GCP #DevSecOps

---

## 93. In medias res: start in the middle of the action

### Post 1. Topic: 3 AM

#### LinkedIn

3:07 AM. My phone will not stop buzzing.

Payment success rate: falling. 99%. 97%. 94%.

I open Grafana with one eye. Tempo shows every slow trace stuck in the same place: a call to an outside provider.

Not our code. Not our cluster. But our customers.

We turn on the fallback path we built three months ago "just in case". Success rate climbs back.

The lesson from that night:
We cannot stop every failure.
But we can decide in daylight what happens when one comes at 3 AM.

#### X

3:07 AM. Phone buzzing.

Payment success: 99, 97, 94%.

Tempo: all slow traces stuck on an outside provider.

We flip the fallback we built "just in case".

Decide in daylight what happens at 3 AM.

#SRE #Observability

### Post 2. Topic: The run was at apply

#### LinkedIn

The TFE run was already applying when I saw the word "replace".

A firewall rule in QA. Replaced, not updated. For a few seconds, there would be no rule at all.

I did not panic. QA could live with a few seconds.
But I wondered: what if this had been Prod?

So I looked closer.
A small rename in the code. Terraform saw a new resource, not a changed one.

The fix: a moved block in Terraform. Now renames do not replace.

And a new habit: search every plan for "replace" before approving. Not only "destroy".

#### X

The TFE run was applying when I saw "replace".

A firewall rule. Gone for a few seconds.

Cause: a simple rename.
Fix: a moved block.

New habit: search plans for "replace", not just "destroy".

#Terraform #GCP

---

## 94. Pixar story spine

### Post 1. Topic: The drift story

#### LinkedIn

Once upon a time, a team managed their GCP setup with Terraform.

Every day, they wrote code, opened PRs and let TFE apply it.

Until one day, someone made a "quick fix" in the console during an incident.

Because of that, Terraform and the real world did not match.

Because of that, the next plan tried to undo the fix.

Because of that, the incident almost came back during a normal release.

Until finally, the team added scheduled drift checks and a rule: any console fix becomes a PR within one day.

And ever since then, quick fixes have stayed fixed.

#### X

Once upon a time, a team used Terraform.

Until one day: a console "quick fix".

Because of that, drift.
Because of that, the next plan undid the fix.

Until finally: drift checks and "console fix = PR in 1 day".

#Terraform #IaC

### Post 2. Topic: The platform team story

#### LinkedIn

Once upon a time, there was a platform team that loved building tools.

Every day, they added new features. A new dashboard. A new pipeline step. A new rule.

Until one day, they noticed developers were not using most of it.

Because of that, they finally asked the developers what hurt.

Because of that, they learned the real pain was simple: slow pipelines and unclear error messages.

Until finally, they spent a whole quarter fixing just those two things.

And ever since then, developers come to the platform first.

#### X

Once upon a time, a platform team built many tools.

Until one day: nobody used them.

Because of that, they asked devs what hurt.
Answer: slow pipelines, bad errors.

Until finally, they fixed just that.

#PlatformEngineering #DevEx

---

## 95. Hero's journey (short form)

### Post 1. Topic: A junior's first prod deploy

#### LinkedIn

Ordinary world: A junior engineer on our team had only ever deployed to Dev.

The call: A small fix needed to go to Prod. I asked them to lead it.

Refusal: "What if I break payments?"

Mentor: We walked through it together. The PR. The Flux sync. The dashboards. The rollback plan.

The test: They merged it. The rollout started. One pod was slow to start. Their heart raced.

The win: It became ready. Error rate flat. Done.

The return: The next week, they explained the process to a new joiner.

That is how confidence is built. One guided step at a time.

#### X

A junior had only deployed to Dev.

I asked them to lead a Prod fix.
"What if I break payments?"

We walked through PR, Flux, dashboards, rollback.

It worked.
Next week, they taught a new joiner.

#Mentoring #GitOps

### Post 2. Topic: The journey of an alert

#### LinkedIn

Ordinary world: Our alerts were noisy. Everyone ignored them.

The call: A real incident hid in the noise for an hour.

Refusal: "We do not have time to fix alerts. We are too busy."

Mentor: The SRE book, and a teammate who said, "We are busy because of the alerts."

The trials: We counted every alert for a month. Deleted half. Rewrote the rest around SLOs.

The win: The next real incident paged in two minutes. Clear runbook. Fixed fast.

The return: Now every new alert must pass a short review before it ships.

#### X

Our alerts were noise.
A real incident hid for an hour.

"No time to fix alerts."
"We're busy because of the alerts."

Deleted half. Rebuilt on SLOs.

Next incident: paged in 2 min.

#SRE #Observability

---

## 96. Sparkline: what is vs what could be

### Post 1. Topic: Developer experience

#### LinkedIn

What is: A developer waits two weeks for a new GCP project.
What could be: They open one PR and have it the same day.

What is: Error messages say "policy violation".
What could be: They say "this container runs as root. Add runAsNonRoot: true. Here is the doc."

What is: Every team builds its own pipeline.
What could be: One golden path, and they only change what is special.

What is: The platform team is a ticket queue.
What could be: The platform is a product people choose.

The gap between the two is our roadmap.

#### X

What is: 2 weeks for a GCP project.
What could be: one PR, same day.

What is: "policy violation".
What could be: "runs as root, add runAsNonRoot".

The gap is our roadmap.

#PlatformEngineering #DevEx

### Post 2. Topic: Security

#### LinkedIn

What is: Security reviews happen once before a big release.
What could be: Every PR is a small security review, done by the pipeline.

What is: Long-lived keys in pipelines.
What could be: Short tokens, gone after each run.

What is: CVEs found in production scans.
What could be: CVEs blocked before merge.

What is: Security says no at the end.
What could be: Security writes the golden path at the start.

We are somewhere in between. Moving a little every sprint.

#### X

What is: security review once a year.
What could be: every PR, by the pipeline.

What is: long-lived keys.
What could be: short tokens.

What is: security says no at the end.
What could be: security builds the path.

#DevSecOps #Security

---

## 97. False start: looks like success, then flips

### Post 1. Topic: The perfect dashboard

#### LinkedIn

We built the perfect Grafana dashboard.

40 panels. Beautiful colours. Every metric we could find. The team was proud. We showed it in a big demo. People clapped.

Three weeks later, I checked the usage stats.

Opened 6 times. Mostly by us.

During the next incident, nobody used it. Too many panels. Too slow to load. Too hard to read in a hurry.

So we started again. Four panels. One question each. Linked from every alert.

Now it gets opened every day.

A dashboard is not done when it looks good. It is done when people use it.

#### X

We built the perfect Grafana dashboard.
40 panels. Applause at the demo.

3 weeks later: opened 6 times.

We rebuilt it with 4 panels.
Now it's used daily.

Done = used, not pretty.

#Grafana #Observability

### Post 2. Topic: The smooth migration

#### LinkedIn

The migration went perfectly.

All services moved to the new GKE cluster over one weekend. Zero downtime. Every test green. We sent a happy message to the whole company on Monday.

On Tuesday, finance called.

The new cluster used bigger nodes than needed. Logging was on full debug. A load balancer from the old setup was still running.

The cloud bill for that week was much higher than planned.

Lesson: a migration is not done when the apps work. It is done when the cost, the logs and the old resources are cleaned up too.

Now "check the bill" is the last step on every migration checklist.

#### X

The migration was perfect.
Zero downtime. Big happy email.

Tuesday: finance called.

Big nodes. Debug logs. An old load balancer still running.

A migration is done when the bill is checked too.

#FinOps #GKE

---

## 98. Nested loops: a story inside a story

### Post 1. Topic: Running, an incident, and patience

#### LinkedIn

Last winter, I was running in the forest when my watch buzzed. A work alert.

(That reminded me of my first year in Germany. I had no job, and I ran every day just to stay calm. I learned then that panic makes everything slower.)

So I did not sprint home. I walked, opened the runbook on my phone, and checked Grafana. A known issue. The on-call teammate already had it.

(And that teammate? A year earlier they were nervous about on-call. We had practised together for weeks.)

By the time I got home, it was fixed.

Calm is trained. On the road and on the team.

#### X

Running in the forest, my watch buzzed. Work alert.

I remembered my first German winter: panic slows everything.

So I walked, checked Grafana.

The teammate I once trained already had it.

Calm is trained.

#SRE #Running

### Post 2. Topic: A book, a bug and a junior

#### LinkedIn

While writing our GKE book, I was stuck on the networking chapter for weeks.

(It reminded me of a bug years ago. A service could not reach another service, and I did not know enough to find out why. It took me two days and a lot of shame.)

So I wrote the chapter for that younger me. Simple pictures. Pod to Service to endpoint.

(Last month, a junior on our team had the same kind of bug. I sent them that chapter. They fixed it in an hour.)

The chapter finally felt worth all those weeks.

#### X

Stuck on our GKE book's networking chapter.

It reminded me of a bug that once took me 2 days.

So I wrote it for that younger me.

Last month a junior used it to fix the same bug in an hour.

#Kubernetes #Learning

---

## 99. Petal structure: many mini-stories, one message

### Post 1. Topic: "What changed?"

#### LinkedIn

Three small stories. One message.

Story 1: A payment service slowed down. We looked at code for an hour. Then we checked Flux. A config change had gone out 10 minutes before.

Story 2: QA tests failed all morning. Nobody had touched the tests. A Terraform run had changed a firewall rule the night before.

Story 3: Our Grafana Cloud bill jumped. Nothing was "broken". Someone had added a new label to a busy metric.

The message: in almost every problem, the first question should be "what changed?"

That is why every dashboard we own has deploy and Terraform run markers.

#### X

3 mini stories:

Slow service: a config change 10 min before.
Failing QA: a firewall change last night.
Bill jump: a new label.

One message:
always ask "what changed?" first.

#SRE #Observability

### Post 2. Topic: Small docs, big saves

#### LinkedIn

Three tiny stories about docs.

One: A new teammate deployed their first service on day two, because the README had five clear lines.

Two: A night alert was fixed in ten minutes by someone who had never seen that service. The runbook had the exact command.

Three: An auditor asked how we manage IAM. We sent one link. The meeting ended early.

Each doc took maybe 20 minutes to write.

Docs are not extra work. They are work we only do once.

#### X

3 tiny doc stories:

New joiner deployed on day 2.
Night alert fixed in 10 min by a stranger to the service.
Audit meeting ended early.

Each doc took ~20 minutes.

#Documentation #DevOps

---

## 100. Converging ideas: separate threads that meet

### Post 1. Topic: Running, German and GitOps

#### LinkedIn

Three things in my life that seemed unrelated.

Running: I run every day. Some days only 15 minutes. The streak is over 1,371 days now.

German: I learn a few words every morning. Slowly. It took years to feel at home in the language.

GitOps: Our platform improves through small PRs. One overlay fix. One alert rule. One module update.

Then one day I saw it. They are the same thing.

Small, daily, boring steps.
No big jumps.
Progress that nobody notices day by day, and everybody notices after a year.

#### X

Running daily.
A few German words each morning.
Small GitOps PRs every day.

I thought they were unrelated.

They are the same thing:
small daily steps that only show after a year.

#Consistency #GitOps

### Post 2. Topic: Storage, bootcamp and payments

#### LinkedIn

Three parts of my career that finally came together.

Storage years: I learned that losing data is the worst thing that can happen.

Coding bootcamp: I learned how frustrating slow pipelines and bad errors are for developers.

Payments platform: I learned that every failed request is a real person who could not pay.

Put them together, and I get the way I build platforms now:
Protect the data.
Respect the developer's time.
Remember the customer at the end of every request.

Nothing we learn is wasted. It just waits for the right moment.

#### X

Storage taught me: protect data.
Bootcamp taught me: respect devs' time.
Payments taught me: every error is a real person.

Together, that is how I build platforms now.

Nothing learned is wasted.

#PlatformEngineering #CareerGrowth

---

## 101. Mountain: rising tension to one climax

### Post 1. Topic: Cutover day

#### LinkedIn

Cutover day for moving payment UIs to the new GKE setup.

8:00. All good. Plan reviewed. Rollback ready.
9:30. First small problem. A DNS record took longer to update. We waited.
10:45. Second problem. One service could not read a secret. A missing IAM binding. Fixed with a PR.
12:00. Third problem. Latency went up in one zone. Heart rate went up too.
12:20. The peak. Error rate crossed the alert line. Everyone on the call went quiet.
12:24. Found it. One node pool had the wrong machine type. Traffic moved off it.
12:30. Green.

Every small problem we had practised for made the big one easier.

#### X

Cutover day:

9:30 slow DNS
10:45 missing IAM binding
12:00 latency up in one zone
12:20 error alert fires. Silence.
12:24 wrong node pool machine type
12:30 green

Practised small problems make big ones easier.

#GKE #SRE

### Post 2. Topic: Preparing for peak shopping days

#### LinkedIn

Getting a payment platform ready for the biggest shopping days of the year.

Week 1: Load tests show we are fine. Easy, we think.
Week 2: A bigger test. One service starts to queue requests.
Week 3: We add replicas. Now the database connections run out.
Week 4: Connection pooling fixed. Now an outside provider rate-limits us.
Week 5: The peak of the stress. We agree on a fallback path with the provider and test it twice.
Peak day: Traffic many times higher than normal. Success rate stays above target.

Each fix showed the next weak spot. That is the point of testing early.

#### X

Peak-day prep:

Wk 1: load test fine
Wk 2: one service queues
Wk 3: DB connections run out
Wk 4: provider rate limits
Wk 5: tested fallback
Peak day: above target

Each fix shows the next weak spot.

#SRE #SystemDesign

---

## 102. Open loop / cliffhanger

### Post 1. Topic: One question that stopped an outage

#### LinkedIn

One question in a PR review once stopped a full outage. I will share the question at the end.

The PR looked simple. A new Kustomize patch for Prod. Small diff. Tests green. Two approvals already.

I almost clicked approve too.

But something felt off. The patch changed a resource name in Prod only. Not in Dev. Not in QA.

So I asked one question in the review.

The author checked. The name change would have made Flux delete the old deployment and create a new one, with no traffic for a few minutes on a payment service.

The question was:
"Has this exact change run in QA first?"

#### X

One question in a PR review stopped a prod outage.

Small diff. Tests green. 2 approvals.

The change existed only in Prod.

The question:
"Has this exact change run in QA first?"

#GitOps #CodeReview

### Post 2. Topic: The cheapest fix we ever made

#### LinkedIn

The cheapest fix we ever made saved more than any big project. What was it? The answer is at the bottom.

Our non-prod GKE clusters ran 24 hours a day, 7 days a week.
Nobody used them at night. Nobody used them on weekends.
But we paid for them anyway.

We talked about big ideas. New node types. A full redesign. Rewriting services.

Then someone said, "What if we just turn things off when nobody is working?"

The fix: a small scheduled job that scales non-prod node pools down at night and on weekends.

One afternoon of work. A big cut in the non-prod bill.

#### X

Our cheapest fix saved more than any big project.

Non-prod GKE ran 24/7.
Nobody used it at night.

The fix?
A scheduled job scaling non-prod down at night and on weekends.

One afternoon of work.

#FinOps #GKE

---

## 103. Contrast hook: "Everyone says X. We did Y."

### Post 1. Topic: Deleting alerts

#### LinkedIn

Everyone says: "Monitor everything. Alert on anything strange."

We did the opposite. We deleted half our alerts.

What happened:
On-call slept better.
People started reading alerts again.
The real incidents got noticed faster, not slower.

What we kept:
Alerts on what customers feel. Error rate and latency on the payment flow.
A few alerts for things that will break soon, like certificates expiring.

Monitoring everything is fine. Alerting on everything is not.

#### X

Everyone says: alert on everything.

We deleted half our alerts.

On-call slept better.
Real incidents got noticed faster.

Monitor everything.
Alert on what customers feel.

#SRE #Observability

### Post 2. Topic: Not building a portal

#### LinkedIn

Everyone says: "A platform team needs a developer portal."

We did not build one. Not yet.

Instead, we focused on:
A service template that works in one PR.
Clear error messages in the pipeline.
A README standard for every repo.
Grafana dashboards that come with each new service.

What happened: teams went from idea to Dev on the same day. Without a portal.

A portal may come later. But a portal on top of a slow, confusing platform is just a nice front door to a messy house.

#### X

Everyone says: build a developer portal.

We didn't. Not yet.

We built: a 1-PR template, clear errors, built-in dashboards.

Result: idea to Dev in a day.

A portal on a messy platform is a nice door to a messy house.

#PlatformEngineering #DevEx

---

## 104. Three-act structure: setup, conflict, resolution

### Post 1. Topic: Moving to Workload Identity on GKE

#### LinkedIn

Act 1. Setup.
Our GKE workloads talked to GCP services using mounted key files. It worked. Nobody wanted to touch it.

Act 2. Conflict.
A security review flagged every key. Some were years old. One was shared by three services. Removing them felt risky. What if payments broke?

Act 3. Resolution.
We moved one service at a time.
Gave each its own Kubernetes service account, mapped to a GCP one with Workload Identity.
Tested in Dev, then QA, then Prod.
Deleted each key right after the switch.

In a few weeks: zero key files in our clusters. No outages.

#### X

Act 1: GKE pods used key files.
Act 2: security flagged them. One key shared by 3 services.
Act 3: Workload Identity, one service at a time, Dev to Prod, keys deleted.

Zero keys. Zero outages.

#GKE #DevSecOps

### Post 2. Topic: Moving to Grafana Cloud

#### LinkedIn

Act 1. Setup.
We ran our own Prometheus, Loki and Tempo. It grew with every new service.

Act 2. Conflict.
Loki ran out of disk on a holiday weekend. Prometheus needed upgrades nobody had time for. The team spent more time running monitoring than using it.

Act 3. Resolution.
We moved to Grafana Cloud.
Kept the same agents and labels, so dashboards and alerts mostly just worked.
Ran both side by side for two weeks.
Set budgets and alerts on usage, so the bill would not surprise us.

Now we spend our time on SLOs, not on disks.

#### X

Act 1: self-hosted PLGT.
Act 2: Loki full on a holiday. No time for upgrades.
Act 3: Grafana Cloud, same agents, 2 weeks side by side, usage alerts on.

Now: time on SLOs, not disks.

#Grafana #Observability

---

## 105. Rule of three

### Post 1. Topic: Three habits of a calm platform team

#### LinkedIn

Three habits I see in every calm platform team.

1. They change things in small pieces.
Small PRs. Small rollouts. Small blast radius.

2. They can see what is happening.
SLOs, traces linked to logs, deploy markers on every dashboard.

3. They write things down.
Runbooks, PR descriptions, postmortems.

Small changes. Clear eyes. Written memory.

Teams that do these three rarely need heroes.

#### X

3 habits of calm platform teams:

Small changes.
Clear eyes.
Written memory.

Teams that do these rarely need heroes.

#PlatformEngineering #SRE

### Post 2. Topic: Three questions before every deploy

#### LinkedIn

Three questions I ask before every deploy to Prod.

1. Has this exact change run in QA?
Same image. Same config. Not "something similar".

2. How do we know it worked?
Which graph, which number, how long do we watch?

3. How do we undo it?
A git revert? A feature flag? A Terraform rollback plan?

If any answer is "not sure", the deploy waits.

Three questions. Less than a minute. Many saved nights.

#### X

3 questions before every Prod deploy:

Did this exact change run in QA?
How will we know it worked?
How do we undo it?

Any "not sure"? It waits.

#DevOps #GitOps
