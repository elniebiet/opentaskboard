import { _otb_generate_uuid } from "../src/common/otb_id_generator";
import { COMPONENT_CLSID_PREFIXES } from "../src/common/otb_component_class_id_prefixes";

describe("otb id uuid generation function tests", () => {
    test('test otb id uuid generation', () => {
        let result = _otb_generate_uuid(20);
        console.log(result);
        expect(result).toBe(null);
    });

    test('test otb arrow id uuid generation', () => {
        let result = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.ARROW);
        console.log(result);
        expect(typeof result).toBe("string");
    });
});

