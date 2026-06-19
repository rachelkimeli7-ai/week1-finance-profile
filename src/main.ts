// week 1 challenge - finance profile page
// types 

type AccountTier = "Basic" | "Standard" | "Premium"

interface PaymentMethod {
  id: string
  name: string
  icon: string
  link: string
  linkText: string
}

interface UserProfile {
  fullName: string
  phone: string
  initials: string
  tier: AccountTier
  balance: number
  currency: string
  monthlySpend: number
  moneyReceived: number
  payments: PaymentMethod[]
}

// my data 

const myUser: UserProfile = {
  fullName: "Kaylah Precious",
  phone: "+254 712345678",
  initials: "KP",
  tier: "Standard",
  balance: 54820.00,
  currency: "KES",
  monthlySpend: 18400,
  moneyReceived: 32000,
  payments: [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: `<div class="icon-mpesa"><i class="fa-solid fa-mobile-screen-button"></i></div>`,
      link: "https://www.safaricom.co.ke/personal/m-pesa",
      linkText: "Open",
    },
    {
      id: "card",
      name: "KCB Visa Card",
      icon: `<div class="icon-card"><i class="fa-solid fa-credit-card"></i></div>`,
      link: "https://ke.kcbgroup.com",
      linkText: "Manage",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: `<div class="icon-paypal"><i class="fa-brands fa-paypal"></i></div>`,
      link: "https://www.paypal.com",
      linkText: "Open",
    },
  ],
}

// badge colours for each tier 
const tierColors: Record<AccountTier, string> = {
  Basic: "badge--gray",
  Standard: "badge--blue",
  Premium: "badge--gold",
}

// format the balance with commas 
function showBalance(amount: number, currency: string): string {
  const formatted = amount.toLocaleString("en-KE", { minimumFractionDigits: 2 })
  return `${currency} ${formatted}`
}

// fill the page with data 
function fillPage(user: UserProfile): void {

  // avatar initials
  const avatarEl = document.querySelector(".avatar-circle span")
  if (avatarEl) {
    avatarEl.textContent = user.initials
  }

  // name
  const nameEl = document.querySelector(".user-name")
  if (nameEl) {
    nameEl.textContent = user.fullName
  }

  // phone
  const phoneEl = document.querySelector(".user-phone")
  if (phoneEl) {
    phoneEl.textContent = user.phone
  }

  // tier badge
  const badgeEl = document.querySelector(".tier-badge")
  if (badgeEl) {
    badgeEl.textContent = user.tier
    badgeEl.className = "tier-badge " + tierColors[user.tier]
  }

  // balance
  const balanceEl = document.querySelector(".balance-number")
  if (balanceEl) {
    balanceEl.textContent = showBalance(user.balance, user.currency)
  }

  // monthly spend
  const spendEl = document.querySelector(".stat-box:nth-child(2) .stat-value")
  if (spendEl) {
    spendEl.textContent = showBalance(user.monthlySpend, user.currency)
  }

  // money received
  const receivedEl = document.querySelector(".stat-box:nth-child(3) .stat-value")
  if (receivedEl) {
    receivedEl.textContent = showBalance(user.moneyReceived, user.currency)
  }

  // payment methods list
  const listEl = document.querySelector(".payments-list")
  if (!listEl) return

  for (let i = 0; i < user.payments.length; i++) {
    const p = user.payments[i]

    const item = document.createElement("li")
    item.className = "payment-item"

    const left = document.createElement("div")
    left.className = "payment-left"

    const iconDiv = document.createElement("div")
    iconDiv.className = "payment-icon"
    iconDiv.innerHTML = p.icon

    const label = document.createElement("span")
    label.className = "payment-name"
    label.textContent = p.name

    left.appendChild(iconDiv)
    left.appendChild(label)

    const link = document.createElement("a")
    link.className = "payment-link"
    link.href = p.link
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.textContent = p.linkText

    item.appendChild(left)
    item.appendChild(link)
    listEl.appendChild(item)
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fillPage(myUser)
})