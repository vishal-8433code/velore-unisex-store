import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SettingsPage() {
  const navigate = useNavigate();

  // ================== States ==================
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState([]);
  // const [providers, setProviders] = useState([]);

  // Addresses remain same
  const [addresses, setAddresses] = useState([]);

  // ================== Fetch data from backend ==================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ================== Orders ==================
        const email = localStorage.getItem("userEmail");
        if (!email)
          return console.error("User email not found in localStorage");

        const ordersRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user-details/user-order`,
          { email }
        );

        if (ordersRes.data.success) setOrders(ordersRes.data.orders);

        // ================== Settings ==================
        // const settingsRes = await axios.post(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/user-details/user-settings`,{email}
        // );
        // if (settingsRes.data.success) setSettings(settingsRes.data.settings);

        // ================== Addresses ==================
        const addressesRes = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/user-details/get-user-address`,
          { email }
        );

        if (addressesRes.data.success)
          setAddresses(addressesRes.data.addresses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ================== Logout ==================
  const handleLogout = () => {
    const confirmLogout = window.confirm("Confirm your logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  const [providers, setProviders] = useState([
    { name: "Google", connected: true },
    { name: "Email", connected: true },
  ]);
  
const handleDelete = async (addressId) => {
  try {
    const email = localStorage.getItem("userEmail");
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/user-details/delete-user-address/${addressId}`,
      { data: { email } }
    );
    console.log(response.data);
    
    // ✅ Use the same variable name as param
    setAddresses(addresses.filter(a => a._id !== addressId));
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="mt-12">
      <Navbar />
      <main className="page" role="main" aria-label="User Settings">
        <header className="header">
          <div className="header-left">
            <h1 className="title">User Settings</h1>
            <div className="flex space-x-4 mt-5">
              <img
                src="/avatar.jpg"
                alt="avatar"
                className="h-16 w-16 rounded-full object-contain"
              />
              <p className="subtitle text-balance justify-center content-center">
                Manage your profile, orders, addresses, preferences, and
                security in one place.
              </p>
            </div>
          </div>

          {/* ✅ Logout button added here */}
          <div className="header-right flex gap-3">
            <button
              className="btn btn-gold"
              onClick={() => alert("Changes saved!")}
            >
              Save Changes
            </button>
            <button className="btn btn-red" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="grid">
          {/* Order History */}
          <section className="card" aria-labelledby="orders-title">
            <div className="card-header">
              <h2 id="orders-title" className="card-title">
                Order History
              </h2>
              <button
                className="btn btn-link"
                onClick={() => alert("Viewing all orders")}
              >
                View All
              </button>
            </div>
            <div className="orders max-h-[560px] overflow-y-auto">
              {orders.map((o) => (
                <article
                  className="order"
                  key={o.id}
                  aria-label={`Order ${o.id}`}
                >
                  <img
                    src={o.img || "/placeholder.svg"}
                    alt=""
                    className="order-img"
                  />
                  <div className="order-info">
                    <div className="order-top">
                      <span className="order-id">{o.id}</span>
                      <span className={`badge ${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    </div>
                    <div className="order-date">{o.date}</div>
                    <div className="order-actions">
                      <button
                        className="btn btn-ghost"
                        onClick={() => alert(`Details for ${o.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Saved Addresses */}
          <section className="card" aria-labelledby="addresses-title">
            <div className="card-header">
              <h2 id="addresses-title" className="card-title">
                Saved Addresses
              </h2>
              <button
                className="btn btn-gold"
                onClick={() => {
                  navigate("/add-address");
                }}
              >
                Add Address
              </button>
            </div>
            <div className="addresses max-h-[280px] overflow-y-auto">
              {addresses.map((a) => (
                <article
                  key={a._id}
                  className="address"
                  aria-label={`${a.name || "Address"} address`}
                >
                  <div className="address-main">
                    <div className="address-name">
                      {a.name || "My Address"}{" "}
                      {a.isDefault ? (
                        <span className="pill">Default</span>
                      ) : null}
                    </div>
                    <div className="address-line">
                      {a.street}, {a.state}, {a.country}
                    </div>
                    <div className="address-meta">
                      {a.city}, {a.pincode}
                    </div>
                  </div>
                  <div className="address-actions">
                    {!a.isDefault ? (
                      <button
                        className="btn btn-ghost"
                        onClick={() => {
                          setAddresses(
                            addresses.map((addr) =>
                              addr._id === a._id
                                ? { ...addr, isDefault: true }
                                : { ...addr, isDefault: false }
                            )
                          );
                        }}
                      >
                        Set Default
                      </button>
                    ) : null}
                    <button
                      className="btn btn-outline"
                      onClick={() => alert(`Edit ${a.name || "Address"}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost"
                    onClick={() => handleDelete(a._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Personalization Settings */}
          <section
            className="card w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-[#0b0b0b] rounded-2xl shadow-lg"
            aria-labelledby="personalization-title"
          >
            <div className="card-header mb-4">
              <h2
                id="personalization-title"
                className="card-title text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400"
              >
                Personalization Settings
              </h2>
            </div>

            <div className="settings-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {settings.map((s) => (
                <SettingToggle key={s.id} {...s} />
              ))}
            </div>
          </section>

          {/* Security & Login */}
          <section className="card" aria-labelledby="security-title">
            <div className="card-header">
              <h2 id="security-title" className="card-title">
                Security & Login
              </h2>
            </div>
            <div className="accounts">
              <div className="accounts-title">Connected Accounts</div>
              <div className="accounts-list">
                {providers.map((p) => (
                  <ConnectedProvider
                    key={p.name}
                    name={p.name}
                    connected={p.connected}
                  />
                ))}
              </div>
            </div>
          </section>
        </section>
        <style>{`
        /* Color system (5 total):
           1) Gold: #f59e0b
           2) Gold Dark: #d97706
           3) Black: #0b0b0b
           4) White: #ffffff
           5) Gray: #9ca3af
        */
        :root {
          --gold: #f59e0b;
          --gold-dark: #d97706;
          --black: #0b0b0b;
          --white: #ffffff;
          --gray: #9ca3af;

          --card-bg: #111111;  /* derived from black */
          --card-border: rgba(255,255,255,0.08); /* white with alpha */
          --muted: rgba(255,255,255,0.7);        /* white with alpha */
          --shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(0,0,0,0.6);
          --radius: 14px;
          --radius-sm: 10px;
        }

        * { box-sizing: border-box; }
        html, body, .page { height: 100%; }
        body { margin: 0; }

        .page {
          background: var(--black);
          color: var(--white);
          padding: 24px 16px 64px;
          display: block;
        }
 .btn-red {
            color: #fff;
            background: linear-gradient(180deg, #ef4444, #dc2626); /* red gradient */
            border: 1px solid rgba(0,0,0,0.35);
          }
          .btn-red:hover {
            filter: brightness(1.1);
          }
        .header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          justify-content: space-between;
          margin: 0 auto 24px;
          max-width: 1200px;
        }

        .title {
          font-size: 28px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0 0 4px 0;
          font-weight: 700;
        }

        .subtitle {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
          max-width: 60ch;
        }

        .header-right { width: 100%; }
        .header-right .btn { width: 100%; }

        .grid {
          display: grid;
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
          grid-template-columns: 1fr;
        }

        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--radius);
          padding: 16px;
          box-shadow: var(--shadow);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .card-title {
          font-size: 18px;
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* Buttons */
        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid transparent;
          font-weight: 600;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          transition: transform 0.12s ease, opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .btn:focus-visible {
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.35);
        }
        .btn:active {
          transform: translateY(1px);
        }

        .btn-gold {
          color: #0b0b0b;
          background: linear-gradient(180deg, var(--gold), var(--gold-dark)); /* subtle glossy look */
          border-color: rgba(0,0,0,0.35);
        }
        .btn-gold:hover {
          filter: brightness(1.05);
        }

        .btn-outline {
          color: var(--white);
          background: transparent;
          border-color: var(--card-border);
        }
        .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .btn-ghost {
          color: var(--white);
          background: transparent;
          border-color: transparent;
        }
        .btn-ghost:hover {
          color: var(--gold);
        }

        .btn-link {
          background: transparent;
          color: var(--gold);
          border: 1px solid transparent;
          padding: 0;
          height: auto;
        }
        .btn-link:hover {
          opacity: 0.9;
          text-decoration: underline;
        }

        /* Profile */
        .profile-content {
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .avatar {
          height: 72px;
          width: 72px;
          border-radius: 50%;
          border: 1px solid var(--card-border);
          object-fit: cover;
          box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        }
        .profile-info { display: grid; gap: 6px; }
        .name { font-weight: 700; font-size: 16px; }
        .email { color: var(--gray); font-size: 13px; }
        .profile-actions { margin-top: 4px; }

        /* Orders */
        .orders {
          display: grid;
          gap: 12px;
        }
        .order {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 12px;
          padding: 12px;
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.02);
        }
        .order-img {
          height: 80px;
          width: 80px;
          border-radius: 10px;
          border: 1px solid var(--card-border);
          object-fit: cover;
        }
        .order-info { display: grid; gap: 8px; }
        .order-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .order-id { font-weight: 600; }
        .order-date { color: var(--gray); font-size: 12px; }
        .badge {
          border: 1px solid var(--gold);
          color: var(--gold);
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 11px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        /* Addresses */
        .addresses {
          display: grid;
          gap: 12px;
        }
        .address {
          display: grid;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--card-border);
          background: rgba(255,255,255,0.02);
        }
        .address-main { display: grid; gap: 4px; }
        .address-name { font-weight: 700; }
        .address-line, .address-meta { color: var(--gray); font-size: 13px; }
        .pill {
          margin-left: 8px;
          color: var(--black);
          background: linear-gradient(180deg, var(--gold), var(--gold-dark));
          border: 1px solid rgba(0,0,0,0.35);
          border-radius: 999px;
          padding: 3px 8px;
          font-size: 11px;
          vertical-align: middle;
        }
        .address-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* Settings toggles */
        .settings-list { display: grid; gap: 12px; }
        .setting {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px;
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.02);
        }
        .setting-left { display: grid; gap: 4px; }
        .setting-label { font-weight: 600; }
        .setting-desc { color: var(--gray); font-size: 13px; }

        .switch {
          position: relative;
          width: 56px;
          height: 32px;
          border-radius: 999px;
          border: 1px solid var(--card-border);
          background: rgba(255,255,255,0.06);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .switch input {
          position: absolute;
          inset: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          margin: 0;
        }
        .knob {
          position: absolute;
          top: 50%;
          left: 4px;
          transform: translate(0, -50%);
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 1px solid var(--card-border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .switch input:checked ~ .knob {
          transform: translate(24px, -50%);
          background: linear-gradient(180deg, var(--gold), var(--gold-dark));
          border-color: rgba(0,0,0,0.35);
        }

        /* Security */
        .security { display: grid; gap: 16px; }
        .password {
          display: grid;
          gap: 10px;
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          padding: 12px;
          background: rgba(255,255,255,0.02);
        }
        .form-group { display: grid; gap: 6px; }
        label { font-size: 13px; color: var(--muted); }
        input {
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--card-border);
          background: #0f0f0f;
          color: var(--white);
          padding: 0 12px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        input::placeholder { color: rgba(255,255,255,0.4); }
        input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
        }
        .actions { margin-top: 4px; }

        .twofa {
          display: grid;
          gap: 12px;
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          padding: 12px;
          background: rgba(255,255,255,0.02);
        }
        .twofa-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .twofa-title { font-weight: 700; }
        .twofa-desc { color: var(--gray); font-size: 13px; }
        .twofa-setup {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .twofa-setup input { flex: 1 1 240px; }

        .accounts {
          display: grid;
          gap: 10px;
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          padding: 12px;
          background: rgba(255,255,255,0.02);
        }
        .accounts-title { font-weight: 700; }
        .accounts-list { display: grid; gap: 10px; }
        .provider {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px;
          border: 1px solid var(--card-border);
          border-radius: 10px;
          background: #101010;
        }
        .provider-name { font-weight: 600; }
        .provider-status { color: var(--gray); font-size: 13px; }

        /* Accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 1px, 1px);
          white-space: nowrap;
          border: 0;
        }

        /* Responsive */
        @media (min-width: 640px) {
          .header {
            flex-direction: row;
            align-items: center;
          }
          .header-right { width: auto; }
          .header-right .btn { width: auto; }
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: 1.1fr 1fr;
          }
          .profile {
            grid-column: 1 / -1;
          }
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
      </main>
      <div className="-mt-20">
        <Footer />
      </div>
    </div>
  );
}

/* Subcomponents */
function SettingToggle({ id, label, desc, onLabel, offLabel, defaultOn }) {
  return (
    <div className="setting">
      <div className="setting-left">
        <div className="setting-label">{label}</div>
        <div className="setting-desc">{desc}</div>
      </div>
      <label className="switch" aria-label={`${label} toggle`}>
        <input
          type="checkbox"
          id={id}
          defaultChecked={defaultOn}
          onChange={(e) => {
            const on = e.target.checked;
            alert(`${label}: ${on ? onLabel : offLabel}`);
          }}
        />
        <span className="knob" aria-hidden="true" />
      </label>
    </div>
  );
}

function ConnectedProvider({ name, connected }) {
  return (
    <div className="provider" role="group" aria-label={`${name} connection`}>
      <div className="provider-left">
        <div className="provider-name">{name}</div>
        <div className="provider-status">
          {connected ? "Connected" : "Not connected"}
        </div>
      </div>
      {connected ? (
        <button
          className="btn btn-outline"
          onClick={() => alert(`Disconnect ${name}`)}
        >
          Disconnect
        </button>
      ) : (
        <button
          className="btn btn-gold"
          onClick={() => alert(`Connect ${name}`)}
        >
          Connect
        </button>
      )}
    </div>
  );
}
