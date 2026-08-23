import React from "react";

export default function AuthIllustration() {
  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center p-4">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm select-none"
      >
        {/* Background Decorative Flow Lines */}
        <path
          d="M 100 150 C 70 200, 70 300, 110 350 C 140 380, 200 400, 250 380"
          stroke="#E5E7EB"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        <path
          d="M 120 120 C 170 80, 220 90, 250 140 C 270 180, 260 250, 310 290"
          stroke="#D1D5DB"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 280 400 C 330 420, 380 390, 390 350"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
        />

        {/* Small Sparkles / Crosses */}
        <path d="M 75 230 H 83 M 79 226 V 234" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 405 180 H 413 M 409 176 V 184" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="360" cy="310" r="3" fill="#9CA3AF" />

        {/* Orange Gear 1 (Top Left) */}
        <g stroke="#FF3811" strokeWidth="2" fill="none">
          <circle cx="160" cy="510" r="30" />
        </g>

        {/* Orange Gears (Bottom Left Background Decorative) */}
        <g opacity="0.85">
          {/* Outer gear 1 */}
          <path
            d="M 115 380 C 115 350, 140 330, 170 330 C 200 330, 225 350, 225 380 C 225 410, 200 430, 170 430 C 140 430, 115 410, 115 380 Z"
            stroke="#FF3811"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
          />
          {/* Outer gear 2 */}
          <path
            d="M 75 420 C 75 395, 95 375, 120 375 C 145 375, 165 395, 165 420 C 165 445, 145 465, 120 465 C 95 465, 75 445, 75 420 Z"
            stroke="#FF3811"
            strokeWidth="2"
            strokeDasharray="5 5"
            fill="none"
          />
        </g>

        {/* Keypad Terminal Container (Main Device Frame) */}
        <rect
          x="270"
          y="140"
          width="125"
          height="225"
          rx="12"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="3"
        />
        {/* Terminal Accent Right/Bottom Shadow Line in Brand Orange */}
        <path
          d="M 395 148 V 360 C 395 365, 390 370, 385 370 H 280"
          stroke="#FF3811"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Terminal Screen Header Box (Password Input Display) */}
        <rect
          x="282"
          y="155"
          width="101"
          height="32"
          rx="6"
          fill="#FFFFFF"
          stroke="#374151"
          strokeWidth="2"
        />
        {/* Password Dots inside screen header */}
        <g fill="#111827">
          <circle cx="307" cy="171" r="3.5" />
          <circle cx="319" cy="171" r="3.5" />
          <circle cx="331" cy="171" r="3.5" />
          <circle cx="343" cy="171" r="3.5" />
          <circle cx="355" cy="171" r="3.5" />
        </g>

        {/* Keypad Buttons Grid (3 x 4 grid) */}
        <g stroke="#374151" strokeWidth="2" fill="#FFFFFF">
          {/* Row 1 */}
          <rect x="285" y="196" width="26" height="20" rx="3" />
          <rect x="319" y="196" width="26" height="20" rx="3" fill="#E5E7EB" />
          <rect x="353" y="196" width="26" height="20" rx="3" />
          {/* Row 2 */}
          <rect x="285" y="222" width="26" height="20" rx="3" />
          <rect x="319" y="222" width="26" height="20" rx="3" />
          <rect x="353" y="222" width="26" height="20" rx="3" />
          {/* Row 3 */}
          <rect x="285" y="248" width="26" height="20" rx="3" />
          <rect x="319" y="248" width="26" height="20" rx="3" />
          <rect x="353" y="248" width="26" height="20" rx="3" />
          {/* Row 4 */}
          <rect x="285" y="274" width="26" height="20" rx="3" />
          <rect x="319" y="274" width="26" height="20" rx="3" />
          <rect x="353" y="274" width="26" height="20" rx="3" />
        </g>

        {/* Scanner / Sensor slot at bottom of terminal */}
        <rect x="324" y="306" width="16" height="22" rx="4" fill="#374151" />
        <rect x="328" y="312" width="8" height="10" rx="2" fill="#9CA3AF" />

        {/* Security Lock Badge (Orange Circle with White Lock) */}
        <g filter="drop-shadow(0px 4px 6px rgba(255, 56, 17, 0.25))">
          <circle cx="200" cy="180" r="25" fill="#FF3811" />
          {/* Lock Shackle */}
          <path
            d="M 194 177 V 172 C 194 168.7 196.7 166 200 166 C 203.3 166 206 168.7 206 172 V 177"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lock Body */}
          <rect x="190" y="176" width="20" height="15" rx="3" fill="#FFFFFF" />
          {/* Keyhole */}
          <circle cx="200" cy="182" r="2" fill="#FF3811" />
          <path d="M 200 183 V 187" stroke="#FF3811" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Gear icon near character feet */}
        <g stroke="#111827" strokeWidth="2.5" fill="none" transform="translate(290, 350)">
          <circle cx="15" cy="15" r="8" />
          <path d="M 15 3 V 7 M 15 23 V 27 M 3 15 H 7 M 23 15 H 27 M 6.5 6.5 L 9.3 9.3 M 20.7 20.7 L 23.5 23.5 M 6.5 23.5 L 9.3 20.7 M 20.7 9.3 L 23.5 6.5" />
        </g>

        {/* Character Figure (Flat Art Style matching reference) */}
        {/* Legs / Trousers */}
        <path
          d="M 196 420 L 210 300 C 215 285, 235 285, 245 300 L 280 415 C 285 435, 270 450, 255 450 H 220 C 205 450, 192 438, 196 420 Z"
          fill="#111827"
        />
        {/* Torso */}
        <path
          d="M 183 268 C 183 245, 205 230, 235 230 C 265 230, 275 250, 275 275 L 268 335 C 268 345, 210 345, 200 335 Z"
          fill="#111827"
        />
        {/* Arm reaching for Keypad */}
        <path
          d="M 260 250 C 275 240, 310 215, 335 205 C 342 202, 348 208, 345 215 C 330 235, 285 270, 270 275 Z"
          fill="#111827"
        />
        {/* Extended Index Finger touching button */}
        <path
          d="M 333 206 L 343 198 C 346 196, 349 200, 346 203 L 336 211 Z"
          fill="#FFE0D1"
          stroke="#111827"
          strokeWidth="1"
        />
        {/* Left Arm / Back Contour */}
        <path
          d="M 183 268 C 175 300, 190 350, 198 380"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Head and Hair */}
        {/* Neck */}
        <rect x="230" y="215" width="12" height="18" fill="#FFE0D1" />
        {/* Face */}
        <path
          d="M 225 190 C 225 180, 235 175, 245 175 C 255 175, 260 185, 260 195 C 260 208, 248 218, 235 218 C 225 218, 225 202, 225 190 Z"
          fill="#FFE0D1"
        />
        {/* Hair */}
        <path
          d="M 222 192 C 220 178, 228 168, 245 168 C 258 168, 268 174, 265 188 C 263 178, 250 174, 238 178 C 230 181, 225 186, 222 192 Z"
          fill="#111827"
        />

        {/* Curved Arrow / Loop indicator near bottom right */}
        <path
          d="M 290 395 C 320 380, 360 385, 375 365"
          stroke="#111827"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 370 363 L 377 364 L 375 371"
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
