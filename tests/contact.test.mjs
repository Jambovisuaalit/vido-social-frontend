import assert from "node:assert/strict";
import test from "node:test";
import handler from "../api/contact.js";

process.env.RESEND_API_KEY = "re_test";
process.env.CONTACT_FROM_EMAIL = "VIDO Social <leads@vidosocial.com>";
process.env.CONTACT_TO_EMAIL = "ville@vidosocial.com";

function request() {
  return {
    method: "POST",
    headers: {
      origin: "https://vido-social-frontend.vercel.app",
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.10",
      "user-agent": "test-agent",
    },
    body: {
      name: "Test User",
      company: "Test Oy",
      email: "test@example.com",
      phone: "+358401234567",
      package: "VIDO Social",
      message: "Test message",
      consent: "on",
    },
    socket: {},
  };
}

function response() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    end(body) {
      this.body = body;
      return this;
    },
  };
}

test("returns success when Resend network call fails after persistence", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("supabase.co")) {
      return {
        ok: true,
        status: 201,
        json: async () => ({ request_id: "req-test" }),
      };
    }
    throw new Error("network unavailable");
  };

  const res = response();
  await handler(request(), res);
  assert.equal(res.statusCode, 201);
  assert.deepEqual(JSON.parse(res.body), {
    ok: true,
    request_id: "req-test",
    notification_sent: false,
  });
});

test("returns success when Resend returns a non-2xx response", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("supabase.co")) {
      return {
        ok: true,
        status: 201,
        json: async () => ({ request_id: "req-test" }),
      };
    }
    return { ok: false, status: 503 };
  };

  const res = response();
  await handler(request(), res);
  assert.equal(res.statusCode, 201);
  assert.equal(JSON.parse(res.body).notification_sent, false);
});
