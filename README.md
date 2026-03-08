# superpayment

## Part 2: Design Challenge

#### 1. Invent a simple business model around the SuperPayment method, something you can describe in one sentence. It doesn’t have to be realistic but it has to explain how the money flows to make everybody happy: merchants, shoppers, and us.

In one sentence: "Buy-back partners fund vouchers by committing to purchase shoppers' used items, shoppers use those vouchers
as payment at merchant checkouts, and SuperFintech takes a commission for facilitating the transaction."

  - Shopper — wants to offset the cost of a new purchase with their old item, maybe they weren't counting on that offset
so they can buy an upgraded item model compared to the item they initially thought so they are really happy 
  - Merchant — wants to increase conversion and average order value by offering trade-in at checkout without losing margin
on the sale so they are ecstatic 
  - Buy-back partner — evaluates and buys the used item for a price that becomes the voucher, then refurbishes
and resells it at a higher price, pocketing a margin (the actual circular economy player), this player doesn't even exist in the
traditional merchant-shopper model so they are happy because the item trade-in from shoppers incentivizes their existence
  - SuperFintech — the platform connecting all three, takes a fee for facilitating, we also exist to facilitate the circular economy
between the other 3 players

The money flow: the buy-back partner assesses the old item's value and commits to purchasing it. That value becomes the
voucher. The shopper uses it as partial payment. The buy-back partner pays SuperFintech, SuperFintech settles with the
merchant (minus a commission), and the buy-back partner receives the old item to refurbish/resell.

#### 2. Design a minimal systems architecture to handle the entire business (not just the part you implemented above), good for thousands of participating merchants and hundreds of thousands of voucher operations per day. It doesn’t need to have a ton of detail, just boxes and arrows that you can present and that we can use to understand and discuss your solution. Make it complete enough that if the CEO looks at it, they think "Yes, if we build all these boxes and integrate with those external services, then we're ready for €10M MRR". Keep it high-level (the piece you’ve built should probably not be more than one box) and avoid talking about load balancers, Kubernetes and CQRS.

#### 3. You only need to be specific about one little part of the system:
- What needs to be integrated into the e-commerce platform (not limited to the checkout)?
- What APIs are required for that integration?
- No need for diagrams here.


#### 4. Platforms & frameworks
- What tech should we use? What should we avoid? Why?
- No need for diagrams here.