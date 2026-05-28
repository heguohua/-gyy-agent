---
name: cross-border-market-research
description: Use this skill when the user wants structured cross-border ecommerce product research for TikTok Shop or no-inventory selling, including TikTok trend discovery, comment intent analysis, cross-platform benchmarking, pricing logic, risk screening, and listing-ready product recommendations.
---

# Cross-Border Market Research

Use this skill when the user wants product research, product selection, competitor benchmarking, or pricing guidance for cross-border ecommerce, especially for TikTok Shop and no-inventory selling.

This skill is optimized for beginner sellers who need decision-ready output rather than generic brainstorming.

## What This Skill Does

This skill turns a repetitive manual workflow into a structured research pass:

1. Discover product signals from TikTok content
2. Judge whether attention is turning into buying intent
3. Validate demand with TikTok Shop and other marketplaces
4. Benchmark prices, positioning, and selling angles
5. Estimate no-inventory fit and basic margin quality
6. Flag risks before the user commits to listing or testing

## Working Principles

- Do not confuse content heat with product viability.
- Favor products with clear purchase intent, not just high engagement.
- Always separate evidence from inference.
- If data is missing, mark it as `Pending verification`.
- Bias toward outputs that help a seller decide whether to test, watch, or reject.
- Since many users are beginners, explain the reason behind each recommendation in plain business language.

## Research Workflow

### 1. TikTok Trend Discovery

Start from the user's target country, category, keyword, audience, or scenario. Look for:

- High-like videos
- High-comment videos
- Product recommendation videos
- Unboxing videos
- Problem-solving demos
- Before/after comparisons
- Repeated product appearances across creators

Capture:

- The product or product cluster
- Main use cases
- Why the content spreads
- Which selling angle gets attention
- Whether the interest seems curiosity-led or demand-led

### 2. Comment Intent Analysis

Treat the comment section as a purchase-intent filter. Look for signals such as:

- "Link?"
- "Where can I buy this?"
- "How much?"
- "Do you ship to X?"
- "I need this"
- "I've been looking for this"
- Requests about size, material, color, quality, or shipping

Classify the result as one of:

- High heat, low buying intent
- High heat, strong buying intent
- Spectator engagement
- Conversion-oriented engagement

### 3. TikTok Shop Validation

Check TikTok Shop for:

- Matching or similar products
- Hot keyword products
- Recommended listings
- Visible selling-price bands
- Repeated creative angles
- Reviews pointing to product strengths or issues

Judge whether platform demand is being commercially captured or whether content interest is failing to convert into shop activity.

### 4. Cross-Platform Benchmarking

Check similar products on:

- Amazon
- Shopee
- Lazada
- Temu
- AliExpress
- 1688 or other supply-side platforms when relevant

Use this pass to answer:

- Is demand visible across multiple platforms?
- Is this a new trend or an existing product repackaged with new content?
- What are the dominant price bands?
- What do buyers repeatedly praise or complain about?
- Is the market early, stable, or overcrowded?

### 5. No-Inventory Fit

Since many users run a no-inventory model, explicitly judge:

- Supply stability
- Ease of sourcing substitutes
- Standardization of the item
- Shipping complexity
- Return/refund risk
- Variation risk from size, color, material, or quality inconsistency
- Need for brand trust or customer education
- Suitability for impulse-buy or short-video conversion

Output one of:

- High fit
- Medium fit
- Low fit
- Not recommended for no-inventory

### 6. Pricing and Margin Logic

Estimate commercial quality using:

- Competitor price
- Market price range
- Reference source cost
- Shipping or fulfillment cost impact
- Platform fee impact
- Room for ad testing
- Refund/after-sales buffer
- Rough margin quality
- Suggested selling price

When hard numbers are unavailable, still classify:

- Low margin
- Medium margin
- High margin
- Testable
- Not worth testing

### 7. Trend Stage and Product Type

Judge the current stage:

- Emerging
- Breaking out
- Crowded follow-on phase
- Stable demand phase
- Declining

Also classify the product type:

- Short-term viral
- Evergreen
- Seasonal
- Emotional-value
- Problem-solving
- Demo-driven

### 8. Content Marketability

Judge whether the product is naturally suited to TikTok-style selling:

- Visual impact
- Before/after effect
- Fast demo clarity
- Strong unboxing or reveal
- Emotional hook
- Giftability
- Impulse-purchase potential

### 9. Risk Screening

Always screen for:

- Trademark risk
- Patent or design risk
- Platform policy risk
- Restricted-category risk
- Compliance/certification risk
- Logistics restrictions
- High after-sales risk
- Extreme commoditization

## Output Requirements

For each candidate product, output the following sections.

### Basic Info

- Product name
- Product image
- Product link
- Merchant or item-detail link
- Source platform
- Target market
- Category

### Market Evidence

- TikTok heat summary
- Comment buying-intent summary
- TikTok Shop benchmark link
- TikTok Shop benchmark price
- Other marketplace benchmark links
- Other marketplace price range

### Analysis

- Core selling points
- Why it is getting attention
- Likely target buyer
- Main use scenario
- Trend judgment
- Lifecycle judgment
- Content marketability
- No-inventory fit
- Risk notes

### Pricing

- Reference cost
- Competitor selling price
- Suggested price
- Estimated margin quality
- Testing recommendation

### Scorecard

- Demand strength: x/10
- Buying intent: x/10
- Content spread potential: x/10
- Margin quality: x/10
- No-inventory fit: x/10
- Risk level: x/10
- Overall recommendation: x/10

### Final Verdict

- Recommendation level
- Why it is recommended or rejected
- Main risks
- Suggested next action

### Listing Title

Generate a listing-ready title from:

- Long-tail keywords
- Hot keywords
- Function words
- Use-case words
- Audience words
- Pain-point words
- Material/spec words

Prefer this formula:

`Core keyword + functional benefit + use case + target audience + supporting attribute`

Avoid vague, empty titles and avoid keyword stuffing without natural meaning.

## Ranking Layer

When multiple products are returned, group them into:

1. Priority test products
2. Watchlist products
3. Do-not-enter products

## Response Style

- Be structured and decisive
- Keep explanations practical
- Prefer comparisons over generic claims
- Explain the business reason behind conclusions
- Focus on what a beginner seller can actually do next

## If the User Input Is Thin

If the user does not provide enough inputs, make the smallest reasonable assumptions and state them clearly. Default to a beginner-friendly analysis angle rather than blocking on missing details.
