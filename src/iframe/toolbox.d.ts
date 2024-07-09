/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const toolbox: {
    kind: string;
    contents: ({
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                TURNS: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
            };
        })[];
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            inputs: {
                TIMES: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                FROM?: undefined;
                TO?: undefined;
                BY?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                FROM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                TO: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                BY: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                TIMES?: undefined;
            };
        })[];
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            fields: {
                NUM: number;
                OP?: undefined;
            };
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                A: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                B: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                NUM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            fields?: undefined;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                NUMBER_TO_CHECK: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            fields: {
                OP: string;
                NUM?: undefined;
            };
            inputs: {
                NUM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                DIVIDEND: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                DIVISOR: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                VALUE: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                LOW: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                HIGH: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                FROM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                TO: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                X: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                Y: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
            };
            fields?: undefined;
        })[];
    })[];
};
//# sourceMappingURL=toolbox.d.ts.map