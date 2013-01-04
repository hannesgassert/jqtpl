## Major refactoring 2.0.0
- Drop compatibility to the original engine, as it is not any more developed
- Made API nicer:
    - jqtpl.tmpl -> jqtpl.render
    - jqtpl.render returns always a string.
    - jqtpl.template -> jqtpl.compile
    - jqtpl.template[name] -> jqtpl.cache[name]
- Make {{each}} tag [].forEach compatible - pass value as first, iteration number or key as a second argument.
- Rename {{tmpl}} tag to {{partial}}.
- Port unit tests from original engine.
- Add browser and AMD support
- Add support express 3.0.x
    - implement partial and layout simpilar to the old express behavour.
- For those who has implemented custom tags:
    - For less conflicts renamed:
        - "_" -> "__body"
        - "$1" -> "__1"
        - "$2" -> "__2"
        - "$1a" -> "__1a"
        - "$data" -> "__data"
    - Removed $data and $item local variables in tempaltes.
    - "_default" -> "default"
    - "$"" namespace for global helper functions, not jQuery.
- Set layout globally:
    app.set('layout', true);

