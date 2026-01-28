"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineBody = exports.TimelineTitle = exports.TimelineTime = exports.TimelineContent = exports.TimelinePoint = exports.TimelineItem = exports.Timeline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const Timeline = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("ol", { ref: ref, className: (0, utils_1.cn)("relative border-l border-zinc-200 ml-3", className), ...props })));
exports.Timeline = Timeline;
Timeline.displayName = "Timeline";
const TimelineItem = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("li", { ref: ref, className: (0, utils_1.cn)("mb-10 ml-6", className), ...props })));
exports.TimelineItem = TimelineItem;
TimelineItem.displayName = "TimelineItem";
const TimelinePoint = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-zinc-200", className), ...props })));
exports.TimelinePoint = TimelinePoint;
TimelinePoint.displayName = "TimelinePoint";
const TimelineContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("", className), ...props })));
exports.TimelineContent = TimelineContent;
TimelineContent.displayName = "TimelineContent";
const TimelineTime = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("time", { ref: ref, className: (0, utils_1.cn)("mb-1 text-sm font-normal leading-none text-zinc-400 dark:text-zinc-500", className), ...props })));
exports.TimelineTime = TimelineTime;
TimelineTime.displayName = "TimelineTime";
const TimelineTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("h3", { ref: ref, className: (0, utils_1.cn)("text-lg font-semibold text-zinc-900", className), ...props })));
exports.TimelineTitle = TimelineTitle;
TimelineTitle.displayName = "TimelineTitle";
const TimelineBody = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("p", { ref: ref, className: (0, utils_1.cn)("mb-4 text-base font-normal text-zinc-500", className), ...props })));
exports.TimelineBody = TimelineBody;
TimelineBody.displayName = "TimelineBody";
//# sourceMappingURL=timeline.js.map