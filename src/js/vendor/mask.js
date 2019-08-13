(function(b) {
    var p = navigator.userAgent, r = /iphone/i.test(p), a = /chrome/i.test(p), k = /android/i.test(p), m;
    b.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: false,
        dataName: "rawMaskFn",
        placeholder: "_"
    };
    b.fn.extend({
        caret: function(a, b) {
            var e;
            if (0 !== this.length && !this.is(":hidden") && this.get(0) === document.activeElement) {
                if ("number" == typeof a)
                    return b = "number" === typeof b ? b : a,
                    this.each(function() {
                        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (e = this.createTextRange(),
                        e.collapse(!0),
                        e.moveEnd("character", b),
                        e.moveStart("character", a),
                        e.select())
                    });
                this[0].setSelectionRange ? (a = this[0].selectionStart,
                b = this[0].selectionEnd) : document.selection && document.selection.createRange && (e = document.selection.createRange(),
                a = 0 - e.duplicate().moveStart("character", -1E5),
                b = a + e.text.length);
                return {
                    begin: a,
                    end: b
                }
            }
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(g, f) {
            var e, d, l, q, z, p, A, t;
            if (!g && 0 < this.length)
                return e = b(this[0]),
                (e = e.data(b.mask.dataName)) ? e() : void 0;
            f = b.extend({
                autoclear: b.mask.autoclear,
                placeholder: b.mask.placeholder,
                completed: null
            }, f);
            d = b.mask.definitions;
            l = [];
            q = A = g.length;
            z = null;
            g = String(g);
            b.each(g.split(""), function(a, b) {
                "?" == b ? (A--,
                q = a) : d[b] ? (l.push(new RegExp(d[b])),
                null === z && (z = l.length - 1),
                a < q && (p = l.length - 1)) : l.push(null)
            });
            return this.trigger("unmask").each(function() {
                function e() {
                    if (f.completed) {
                        for (var a = z; a <= p; a++)
                            if (l[a] && E[a] === y(a))
                                return;
                        f.completed.call(x)
                    }
                }
                function y(a) {
                    return a < f.placeholder.length ? f.placeholder.charAt(a) : f.placeholder.charAt(0)
                }
                function B(a) {
                    for (; ++a < A && !l[a]; )
                        ;
                    return a
                }
                function w(a, b) {
                    var d, e;
                    if (!(0 > a)) {
                        d = a;
                        for (e = B(b); d < A; d++)
                            if (l[d]) {
                                if (e < A && l[d].test(E[e]))
                                    E[d] = E[e],
                                    E[e] = y(e);
                                else
                                    break;
                                e = B(e)
                            }
                        aa();
                        x.caret(Math.max(z, a))
                    }
                }
                function G(a) {
                    var b, d, e;
                    b = a;
                    for (a = y(a); b < A; b++)
                        if (l[b])
                            if (d = B(b),
                            e = E[b],
                            E[b] = a,
                            d < A && l[d].test(e))
                                a = e;
                            else
                                break
                }
                function D(a) {
                    var b = x.val();
                    a = x.caret();
                    if (t && t.length && t.length > b.length) {
                        for (R(!0); 0 < a.begin && !l[a.begin - 1]; )
                            a.begin--;
                        if (0 === a.begin)
                            for (; a.begin < z && !l[a.begin]; )
                                a.begin++
                    } else
                        R(!0),
                        b = b.charAt(a.begin),
                        a.begin < A && (l[a.begin] || a.begin++,
                        l[a.begin].test(b) && a.begin++);
                    x.caret(a.begin, a.begin);
                    e()
                }
                function ba(a) {
                    R();
                    x.val() != ea && x.change()
                }
                function O(a, b) {
                    var d;
                    for (d = a; d < b && d < A; d++)
                        l[d] && (E[d] = y(d))
                }
                function aa() {
                    x.val(E.join(""))
                }
                function R(a) {
                    var b = x.val(), d = -1, e, g, k;
                    for (k = e = 0; e < A; e++)
                        if (l[e]) {
                            for (E[e] = y(e); k++ < b.length; )
                                if (g = b.charAt(k - 1),
                                l[e].test(g)) {
                                    E[e] = g;
                                    d = e;
                                    break
                                }
                            if (k > b.length) {
                                O(e + 1, A);
                                break
                            }
                        } else
                            E[e] === b.charAt(k) && k++,
                            e < q && (d = e);
                    a ? aa() : d + 1 < q ? f.autoclear || E.join("") === S ? (x.val() && x.val(""),
                    O(0, A)) : aa() : (aa(),
                    x.val(x.val().substring(0, d + 1)));
                    return q ? e : z
                }
                var x = b(this)
                  , E = b.map(g.split(""), function(a, b) {
                    if ("?" != a)
                        return d[a] ? y(b) : a
                })
                  , S = E.join("")
                  , ea = x.val();
                x.data(b.mask.dataName, function() {
                    return b.map(E, function(a, b) {
                        return l[b] && a != y(b) ? a : null
                    }).join("")
                });
                x.one("unmask", function() {
                    x.off(".mask").removeData(b.mask.dataName)
                }).on("focus.mask", function() {
                    if (!x.prop("readonly")) {
                        clearTimeout(m);
                        var a;
                        ea = x.val();
                        a = R();
                        m = setTimeout(function() {
                            x.get(0) === document.activeElement && (aa(),
                            a == g.replace("?", "").length ? x.caret(0, a) : x.caret(a))
                        }, 10)
                    }
                }).on("blur.mask", ba).on("keydown.mask", function(a) {
                    if (!x.prop("readonly")) {
                        var b = a.which || a.keyCode, d, e;
                        t = x.val();
                        if (8 === b || 46 === b || r && 127 === b) {
                            d = x.caret();
                            e = d.begin;
                            d = d.end;
                            if (0 === d - e) {
                                if (46 !== b)
                                    for (; 0 <= --e && !l[e]; )
                                        ;
                                else
                                    e = d = B(e - 1);
                                d = 46 === b ? B(d) : d
                            }
                            O(e, d);
                            w(e, d - 1);
                            a.preventDefault()
                        } else
                            13 === b ? ba.call(this, a) : 27 === b && (x.val(ea),
                            x.caret(0, R()),
                            a.preventDefault())
                    }
                }).on("keypress.mask", function(a) {
                    if (!x.prop("readonly")) {
                        var d = a.which || a.keyCode, f = x.caret(), g, q;
                        a.ctrlKey || a.altKey || a.metaKey || 32 > d || !d || 13 === d || (0 !== f.end - f.begin && (O(f.begin, f.end),
                        w(f.begin, f.end - 1)),
                        g = B(f.begin - 1),
                        g < A && (d = String.fromCharCode(d),
                        l[g].test(d) && (G(g),
                        E[g] = d,
                        aa(),
                        q = B(g),
                        k ? setTimeout(function() {
                            b.proxy(b.fn.caret, x, q)()
                        }, 0) : x.caret(q),
                        f.begin <= p && e())),
                        a.preventDefault())
                    }
                }).on("input.mask paste.mask", function() {
                    x.prop("readonly") || setTimeout(function() {
                        var a = R(!0);
                        x.caret(a);
                        e()
                    }, 0)
                });
                if (a && k)
                    x.off("input.mask").on("input.mask", D);
                R()
            })
        }
    })
})(jQuery);