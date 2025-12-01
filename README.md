# Forms Dashboard App

A simple dashboard for managing forms with authentication via NextAuth.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- NextAuth
- Zod

## Features

- Authentication (Admin and Individual roles)
- Create, update, delete forms (Admin only)
- Filter forms by status
- Server-side rendering
- Responsive design
- SEO-friendly setup

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Ilyasklyar/forms-dashboard.git
cd forms-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here
```

4. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Usage

- **Admin users** can create, update, and delete forms
- **Individual users** can view forms
- Filter forms by status using the dropdown

## Screenshots

![Dashboard Screenshot](/images/screen1.png)
![Dashboard Screenshot](/images/screen2.png)
